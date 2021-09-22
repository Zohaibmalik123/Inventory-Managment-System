const express = require('express')
const Brand = require('../Model/brand')
const router = new express.Router()
const auth = require('../middleware/authuser')
const assert = require('assert')



router.post('/create/brand' ,auth , async (req , res)=>{
    const brand = new  Brand(req.body)
    try{
        await brand.save()
        res.status(201).send(brand)
    } catch (e) {
        res.status(400).send(e)
    }

})

router.get('/get-brands'  , async (req , res)=>{
    try{
        const brand = await Brand.find({})
        res.send(brand)
    } catch (e) {
        res.status(500).send(e)
    }
})
router.get('/get-brand/:id'  , async (req , res)=>{
    const id = req.params.id

    try{
        const brands = await Brand.findById(id)
        res.send(brands)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/brand/update/' , auth  , async (req , res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates=['brandName' , 'brandStatus']
    const isValidOperations= updates.every((update)=> allowedUpdates.includes(update))

    if (!isValidOperations){
        res.status(400).send({Error : 'invalid updates'})
    }

    try{
        // const user = await User.findByIdAndUpdate(_id )
        updates.forEach((update)=> req.brand[update] = req.body[update])
        await req.brand.save()
        res.send(req.brand)
    } catch(e){
        res.status(400).send(e)
    }
})

// router.delete('/delete/brand' , async (req , res)=>{
//     try{
//         await req.brand.remove()
//         // console.log(req.brand)
//         res.send(req.brand)
//     } catch(e){
//         res.status(500).send(e)
//     }
// })




module.exports= router