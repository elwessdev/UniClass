import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, deleteDoc, collectionData, query, where } from '@angular/fire/firestore';
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
  // deleteClass(classId: string): Promise<void> {
  //   return this.firestore.collection('classes').doc(classId).delete();
  // }
  removeClass(classId: string): Promise<void> {
    const classDocRef = doc(this.firestore, `class/${classId}`);
    return deleteDoc(classDocRef);
  }

  getClassesForUser(userId: string): Observable<any[]> {
    const classesRef = collection(this.firestore, 'class');
    const q = query(classesRef, where('user_id', '==', userId));
    return collectionData(q, { idField: 'id' });
  }

  // Optionally, if you want to fetch all classes
  // getClasses(): Observable<any> {
  //   const classesRef = collection(this.firestore, 'classes');
  //   return new Observable(observer => {
  //     // Assuming you are using AngularFire's Firestore collection method to fetch classes
  //     const querySnapshot = collection(this.firestore, 'classes');
  //     querySnapshot.onSnapshot((snapshot) => {
  //       observer.next(snapshot.docs.map(doc => doc.data()));  // Returning class data from Firestore
  //     });
  //   });
  // }
}