const express = require('express')
const Product = require('../Model/product')
const router = new express.Router()
const auth = require('../middleware/authuser')



router.post('/create/product'  , auth, async (req , res)=>{
    const product = new Product(req.body)
    console.log(product)
    try{
        await product.save()
        console.log(product)
        res.status(201).send(product)

    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }

})
// router.patch('/update/product' , async (req , res)=>{
//     const updates = Object.keys(req.body)
//     const allowedUpdates=['productName , brandName , rate , quantity']
//     const isValidOperations= updates.every((update)=> allowedUpdates.includes(update))
//
//     if (!isValidOperations){
//         res.status(400).send({Error : 'invalid updates'})
//     }
//
//     try{
//         // const user = await User.findByIdAndUpdate(_id )
//         updates.forEach((update)=> req.brand[update] = req.body[update])
//         await req.brand.save()
//         res.send(req.brand)
//     } catch(e){
//         res.status(400).send(e)
//     }
// })
//
// router.delete('/delete/product' , async (req , res)=>{
//     try{
//         await req.brand.remove()
//         // console.log(req.brand)
//         res.send(req.brand)
//     } catch(e){
//         res.status(500).send(e)
//     }
// })

module.exports= router