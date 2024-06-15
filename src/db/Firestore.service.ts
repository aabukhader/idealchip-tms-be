import { Injectable } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';

@Injectable()
export class FireStoreService {
  document: FirebaseFirestore.DocumentReference<
    FirebaseFirestore.DocumentData,
    FirebaseFirestore.DocumentData
  >;
  constructor(documentPath: string) {
    const firestore = new Firestore();
    this.document = firestore.doc(documentPath);
  }
  async create(body) {
    await this.document.set(body);
  }

  async update(body) {
    await this.document.update({
      body: 'My first Firestore app',
    });
  }
}
