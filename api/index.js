const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('./models/user');
const Order = require('./models/order');

const app = express();
const port = 3000;

const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require('jsonwebtoken');
mongoose.connect("mongodb+srv://arslan:arslan@cluster0.y0cak.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const sendVerificationEmail = async (email, verficationToken) => {
    //create a nodemailer tranporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'arslanpc65@gmail.com',
            pass: 'jlmp mwqb qshe wvzp'
        }
    });
    //compose the email
    const mailOptions = {
        from: 'amazon.com',
        to: email,
        subject: 'Email Verification',
        text: `Please verify your email by clicking on the following link: http://localhost:3000/verify/${verficationToken}`
    }
    //send the email
    try {
        await transporter.sendMail(mailOptions)

    } catch (error) {
        console.log("Error in sending verification email", error)
    }

}

//End point to register in the app
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        //create a new user
        const newUser = new User({
            name,
            email,
            password
        });
        //generate and store the varification token
        newUser.verficationToken = crypto.randomBytes(20).toString('hex');

        //save the user to the database

        await newUser.save();
        //send verification email to the user
        sendVerificationEmail(newUser.email, newUser.verficationToken);



    } catch (error) {
        console.log("error in registering user", error);
        res.status(500).json({ message: "resgisteration failed" });
    }
})
//end point to verify email

app.get('/verify/:token', async (req, res) => {
    try {
        const user = await User.findOne({ verficationToken: req.params.token });
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        user.verified = true;
        user.verficationToken = null;
        await user.save();
        res.json({ message: 'Email verified successfully' });
    } catch (error) {
        console.log("Error in verifying email", error);
        res.status(500).json({ message: 'Verification failed' });
    }
});

const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString('hex');
    return secretKey;
}

const secretKey = generateSecretKey();

// end point to login the user
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        //check if the user password is correct
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid password" });
        }
        //generate the JWT token
        const token = jwt.sign({ userId: user._id }, secretKey)
        res.status(200).json({ token: token });

    } catch (error) {
        res.status(500).json({ message: "Error in login" });
    }
});


// end point to add a new address of user 
app.post('/addresses', async (req, res) => {
    try {
        const { userId, address } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.addresses.push(address);
        await user.save();
        res.status(201).json({ message: 'Address added successfully' });
    } catch (error) {
        console.log("Error in adding address", error);
        res.status(500).json({ message: 'Address addition failed' });
    }
})


//end point to get all addresses of a particular user 

app.get('/addresses/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user.addresses);
    } catch (error) {
        console.log("Error in getting addresses", error);
        res.status(500).json({ message: 'Address retrieval failed' });
    }
})

//end point to store an order

app.post('/orders', async (req, res) => {
    try {
        const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        //create an array of product objects from the cart items
        const products = cartItems.map(item => {
            return {
                // _id: item._id,
                name: item.title,
                price: item.price,
                quantity: item.quantity,
                image: item.image
            }
        });

        //create a new order
        const order = new Order({
            user: userId,
            products: products,
            totalPrice: totalPrice,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod
        });

        //save the order
        await order.save()
        res.status(200).json({ message: 'Order placed successfully' });

    } catch (error) {
        console.log("Error in placing order", error);
        res.status(500).json({ message: 'Order placement failed' });
    }
})

//get the user profile
app.get('/profile/:userId' , async(req, res) => {
    try {
        const userId = req.params.userId
       const user =  await User.findById(userId)

       if(!user){
           return res.status(404).json({message: "user not found"})
       }

       res.status(200).json(user)
    } catch (error) {
        res.status(404).json({message: "error getting user profile" , error})
    }
})

//get the user order  jo bi us user ny order kiya hai wo get krna hai
app.get('/order/:orderId' , async(req,res) => {
    try {
        const userId = req.params.userId

        const orders = await Order.find({user: userId}).populate("user")

        if(!orders || orders.length ==0) {
            return res.status(404).json({message: "No orders found"});
        }

        res.status(200).json({orders});

        
    } catch (error) {
        res.status(500 ).json({message:"Error getting"});
    }
})
