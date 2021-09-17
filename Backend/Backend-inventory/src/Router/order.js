const express = require('express')
const Order = require('../Model/order')
const router = new express.Router()
const auth = require('../middleware/authuser')



router.post('/create/order' , auth , async (req , res)=>{
    const order = new Order(req.body)
    try{
        await order.save()
        res.status(201).send(order)

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