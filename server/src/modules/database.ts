/// <reference path="../../../typings/index.d.ts" />
import {MongoClient} from 'mongodb'

module Database {
	let url = 'mongodb://localhost:27017/turnip'
	export function insertData(collectionName:string,objects) {
		MongoClient.connect(url,(err,db) => db.collection(collectionName).insertMany(objects))
	}
	export function getAllData(collectionName:string) {
		let data:any[] = []
		MongoClient.connect(url,(err,db) => {
			let cursor = db.collection(collectionName).find()
			let data = cursor.toArray()
		})
	}
}

export default Database