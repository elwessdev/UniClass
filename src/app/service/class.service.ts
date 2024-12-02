import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, deleteDoc, collectionData, query, where, docData, updateDoc, arrayUnion, arrayRemove, getDocs, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private firestore: Firestore) { }

  addClass(classData: any): Promise<any> {
    const classesRef = collection(this.firestore, 'class');
    return addDoc(classesRef, classData);
  }
  
  removeClass(classId: string): Promise<void> {
    const classDocRef = doc(this.firestore, `class/${classId}`);
    return deleteDoc(classDocRef);
  }

  getClassesForUser(userId: string): Observable<any[]> {
    const classesRef = collection(this.firestore, 'class');
    const q = query(classesRef, where('user_id', '==', userId));
    return collectionData(q, { idField: 'id' });
  }
  
  getClassById(classId: string) {
    const classDocRef = doc(this.firestore, `class/${classId}`);
    return docData(classDocRef, { idField: 'id' });
  }

  addMaterialToClass(classId: string, newMaterial: any) {
    const classDocRef = doc(this.firestore, `class/${classId}`);
    return updateDoc(classDocRef, {
      materials: arrayUnion(newMaterial),
    });
  }

  deleteMaterialFromClass(classId: string, materialId: string) {
    const classDocRef = doc(this.firestore, `class/${classId}`);
    docData(classDocRef).subscribe((classData: any) => {
      if (classData) {
        const updatedMaterials = classData.materials.filter((material: any) => material.id !== materialId);
        updateDoc(classDocRef, {
          materials: updatedMaterials
        }).then(() => {
          console.log('Material removed successfully');
        }).catch((error: any) => {
          console.error('Error removing material: ', error);
        });
      }
    });
  }
  
  async joinClass(userData: any, code: string): Promise<string> {
    try {
      const classesRef = collection(this.firestore, 'class');
      const q = query(classesRef, where('code', '==', code));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error('Class not found');
      }

      const classDoc = querySnapshot.docs[0];
      const classData = classDoc.data();

      const isMember = classData['members']?.some((member: any) => member.user_id === userData.user_id);
      if (isMember) {
        return 'You are already a member of this class';
      }

      if(classData['user_id'] === userData.user_id) {
        return 'You are the owner of this class';
      }

      const classDocRef = doc(this.firestore, `class/${classDoc.id}`);
      await updateDoc(classDocRef, {
        members: arrayUnion(userData),
      });

      const userDocRef = doc(this.firestore, `users/${userData.user_id}`);
      await updateDoc(userDocRef, {
        classes: arrayUnion(code),
      });

      return 'Successfully joined class';
    } catch (error) {
      console.error('Error joining class:', error);
      throw error;
    }
  }

  async getUserClasses(userId: string): Promise<any[]> {
    try {
      const userDocRef = doc(this.firestore, `users/${userId}`);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.exists() ? userDoc.data() : null;

      if (!userData || !userData['classes']) {
        throw new Error('User has no classes');
      }

      const classesRef = collection(this.firestore, 'class');
      const q = query(classesRef, where('code', 'in', userData['classes']));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return [];
      }

      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data(),
      }));
    } catch (error) {
      console.error('Error fetching user classes:', error);
      throw error;
    }
  }

  async unrollClass(userId: string, classId: string): Promise<string> {
    try {
      const classDocRef = doc(this.firestore, `class/${classId}`);
      const userDocRef = doc(this.firestore, `users/${userId}`);

      // Get class data
      const classDoc = await getDoc(classDocRef);
      if (!classDoc.exists()) {
        throw new Error('Class not found');
      }

      const classData = classDoc.data();
      const isMember = classData?.['members']?.some((member: any) => member.user_id === userId);
      if (!isMember) {
        return 'User is not a member of this class';
      }

      // Remove the user from the class members
      await updateDoc(classDocRef, {
        members: arrayRemove({ user_id: userId }),
      });

      return 'Successfully unrolled from the class';
    } catch (error) {
      console.error('Error unrolling from class:', error);
      throw error;
    }
  }
}