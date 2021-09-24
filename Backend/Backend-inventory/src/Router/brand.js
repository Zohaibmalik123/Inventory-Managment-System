const express = require('express')
const Brand = require('../Model/brand')
const router = new express.Router()
const auth = require('../middleware/authuser')
const assert = require('assert')



router.post('/create/brand' , auth  , async (req , res)=>{
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

router.patch('/brand/update/:id'  ,async (req , res)=>{
    try{
         const _id = req.params.id;
         // console.log(req.body);
         // console.log(_id)
        const updateBrand = await Brand.findByIdAndUpdate( _id , req.body)
        res.send(updateBrand)
    } catch(e){
        res.status(400).send(e)
    }
})

router.delete('/delete/brand/:id' , async (req , res)=> {
    const _id = req.params.id

    try {
        const brand = await Brand.findByIdAndDelete(_id)
        if (!brand) {
            res.status(404).send()
        }
        res.send(brand)
//         await req.brand.remove()
//         // console.log(req.brand)
//         res.send(req.brand)
    } catch (e) {
        res.status(500).send(e)
    }
// })


})

module.exports= router