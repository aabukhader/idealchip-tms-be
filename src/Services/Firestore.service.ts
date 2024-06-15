import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirestoreService {
  private firestore: admin.firestore.Firestore;

  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App,
  ) {
    this.firestore = this.firebaseAdmin.firestore();
  }

  async getCollection(collectionName: string) {
    const collectionRef = this.firestore.collection(collectionName);
    const snapshot = await collectionRef.get();
    const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return docs;
  }

  async getDocument(collectionName: string, documentId: string) {
    const docRef = this.firestore.collection(collectionName).doc(documentId);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new Error('Document not found');
    }
    return { id: doc.id, ...doc.data() };
  }

  async getDocumentByBoardId(collectionName: string, boardId: string) {
    const querySnapshot = await this.firestore.collection(collectionName)
        .where('boardId', '==', boardId)
        .get();
    
    if (querySnapshot.empty) {
        return [];
    }

    const documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return documents;
}


  async createDocument(collectionName: string, data: any) {
    const collectionRef = this.firestore.collection(collectionName);
    const docRef = await collectionRef.add(data);
    return { id: docRef.id, ...data };
  }

  async updateDocument(collectionName: string, documentId: string, data: any) {
    const docRef = this.firestore.collection(collectionName).doc(documentId);
    await docRef.update(data);
    return { id: documentId, ...data };
  }

  async deleteDocument(collectionName: string, documentId: string) {
    const docRef = this.firestore.collection(collectionName).doc(documentId);
    await docRef.delete();
    return { id: documentId };
  }
}
