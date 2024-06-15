import { Injectable } from '@nestjs/common';
import { FirestoreService } from 'src/Services/Firestore.service';
import { HistoryService } from 'src/Services/History.service';

@Injectable()
export class BoardService {
  collection: string = 'board';
  constructor(
    private readonly firestore: FirestoreService,
    private history: HistoryService,
  ) {}
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
      const doc = await this.firestore.getDocument(this.collection, documentId);
      return { data: doc, message: '', status: 200 };
    } catch (error) {
      return { data: [], message: error.message, status: 500 };
    }
  }

  async createDocument(body: any) {
    try {
      const collectionRef = await this.firestore.createDocument(
        this.collection,
        body,
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
      await this.history.add({
        action: 'Update',
        ticketId: docRef.id,
        user: data.userId,
      });
      return { data: docRef, message: '', status: 200 };
    } catch (error) {
      return { data: [], message: error.message, status: 500 };
    }
  }

  async deleteDocument(documentId: string, userId: any) {
    try {
      const docRef = await this.firestore.deleteDocument(
        this.collection,
        documentId,
      );
      await this.history.add({
        action: 'Delete',
        ticketId: docRef.id,
        user: userId,
      });
      return { data: docRef, message: '', status: 200 };
    } catch (error) {
      return { data: [], message: error.message, status: 500 };
    }
  }
}
