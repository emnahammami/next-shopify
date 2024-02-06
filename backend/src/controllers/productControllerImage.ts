// entryController.ts

import { Response } from 'express'
import { db } from '../firebase/firebase'

type EntryType = {
 _id: string,

 image: string
}

type Request = {
  body: EntryType,
  params: { entryId: string }
}

export const addEntry = async (req: Request, res: Response) => {
  const {  _id,image } = req.body

  try {
    const entry = db.collection('Product').doc()
    const entryObject = {
      id: _id,
      image
    }

    entry.set(entryObject)

    res.status(200).send({
      status: 'success',
      message: 'entry added successfully',
      data: entryObject
    })
  } catch(error:any) {
      res.status(500).json(error.message)
  }
}

export const getAllEntries = async (req: Request, res: Response) => {
  try {
    const allEntries: EntryType[] = []
    const querySnapshot = await db.collection('Product').get()
    querySnapshot.forEach((doc: any) => allEntries.push(doc.data()))
    return res.status(200).json(allEntries)
  } catch(error:any) { return res.status(500).json(error.message) }
}

