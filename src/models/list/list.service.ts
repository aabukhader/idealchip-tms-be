import { Injectable } from '@nestjs/common';
import { FirestoreService } from 'src/Services/Firestore.service';

@Injectable()
export class ListService {
  collection: string = 'list';
  constructor(private readonly firestore: FirestoreService) {}
  async getCollection() {
    try {
      const docs = await this.firestore.getCollection(this.collection);
      return { data: docs, message: '', status: 200 };
    } catch (error) {
      return { data: [], message: error.message, status: 500 };
    }
  }

  async getDocument(documentId: string) {
    try {
      const doc = await this.firestore.getDocumentByBoardId(this.collection, documentId);
      return { data: doc, message: '', status: 200 };
    } catch (error) {
      return { data: [], message: error.message, status: 500 };
    }
  }

  async createDocument(data: any) {
    try {
      const collectionRef = await this.firestore.createDocument(
        this.collection,
        data,
      );
      return { data: collectionRef, message: '', status: 201 };
    } catch (error) {
      return { data: [], message: error.message, status: 500 };
    }
  }

  async updateDocument(documentId: string, data: any) {
    try {
      const docRef = await this.firestore.updateDocument(
        this.collection,
        documentId,
        data,
      );
      return { data: docRef, message: '', status: 200 };
    } catch (error) {
      return { data: [], message: error.message, status: 500 };
    }
  }

  async deleteDocument(documentId: string) {
    try {
      const docRef = await this.firestore.deleteDocument(
        this.collection,
        documentId,
      );
      return { data: docRef, message: '', status: 200 };
    } catch (error) {
      return { data: [], message: error.message, status: 500 };
    }
  }
}
