import express from 'express'
import dbCon from './utils/db.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import path from 'path';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import promotionRouter from './routes/promotion.route.js'
import employeeRouter from './routes/employee.route.js'
import supplierRouter from './routes/supplier.route.js'
import inventoryRouter from './routes/inventory.route.js'
import feedbackRouter from './routes/feedback.route.js'
import prescriptionRouter from './routes/prescription.route.js'
import driverRouter from './routes/driver.route.js'
import taskRouter from './routes/task.route.js'
import paymentRouter from './routes/payment.route.js'
import supplyRequestRouter from './routes/SupplyRequest.route.js'
import notificationRouter from './routes/notififcation.route.js'
import employeeLeaveRouter from './routes/employeeLeave.route.js'
import employeeSalaryRouter from './routes/employeeSalary.route.js'

const app = express()
dbCon()

const __dirname = path.resolve();

app.use(express.json())
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));



app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/promotion', promotionRouter)
app.use('/api/employee', employeeRouter)
app.use('/api/supplier', supplierRouter)
app.use('/api/inventory', inventoryRouter)
app.use('/api/feedback', feedbackRouter)
app.use('/api/prescription', prescriptionRouter)
app.use('/api/driver', driverRouter)
app.use('/api/payment', paymentRouter)
app.use('/api/task', taskRouter);
app.use('/api/notification',notificationRouter);
app.use('/api/supplyRequest', supplyRequestRouter);
app.use('/api/employeeLeave', employeeLeaveRouter)
app.use('/api/employeeSalary', employeeSalaryRouter)


app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
    }
);