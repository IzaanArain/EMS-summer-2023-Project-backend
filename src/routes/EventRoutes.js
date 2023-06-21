const express=require("express")

const { getAllEvents, 
    addEvent, 
    getEvent, 
    UpdateEvent, 
    deleteEvent, 
    patchEvent } = require("../controllers/EventController")
const validateToken = require("../middleware/ValidateToken")

const router=express.Router()
//require authentication for all routes via validateToken middleware
router.use(validateToken)

router.route('/')
.get(getAllEvents)
.post(addEvent)

router.route('/:id')
.get(getEvent)
.put(UpdateEvent)
.delete(deleteEvent)
.patch(patchEvent)

module.exports=router