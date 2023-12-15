import React, { useContext } from 'react';
// import SignupBasicinfo from '../components/SignupBasicinfo'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Signupaddprofilepic from './Signupaddprofilepic';
import Signupaddmoreinfo from './Signupaddmoreinfo';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { usercontext } from '../Context/Userstate';
import { useForm } from "react-hook-form";
import FormHelperText from '@mui/material/FormHelperText';


const steps = ['Fill Basic Information','Add Profile Picture', 'Add Additional Information'];

export default function Signup() {

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const { register, handleSubmit, formState: { errors }} = useForm();
  const {newuser, setnewuser} = useContext(usercontext)

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = (data) => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setnewuser(data)
    console.log("form submitted",newuser)

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
    <h3 className='mt-4 d-flex justify-content-center align-content-center' style={{color:"#182748",fontWeight:"bolder",textDecoration:"underline"}}>Create an Account</h3>
    <Box className='container my-5' sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
          {/* <SignupBasicinfo activestep={activeStep}/> */}
          <form onSubmit={handleSubmit(handleNext)}>
          <div className={`container d-flex justify-content-center align-items-center my-5 w-100 ${activeStep!==0 && 'd-none'} `}>
            <div className="row gx-5" style={{padding:"15px",border:"1px dotted purple",boxShadow: "rgba(99, 99, 99, 0.4) 0px 2px 8px 0px"}}>
              <div className="col-8 d-flex flex-column">
                <TextField className='my-2 mx-2' label="Name" variant="standard" name='name' {...register("name",{required: "Enter your Name"})} error={Boolean(errors.name)} helperText={errors.name?.message}/>
                <TextField className='my-2 mx-2' label="Email" variant="standard" name='email'  {...register("email",{required: "Enter your Email"})} error={Boolean(errors.email)} helperText={errors.email?.message}/>
                <TextField className='my-2 mx-2' label="Password" variant="standard" type="password" name='password'  {...register("password",{required: "Password should be atleast of 6 characters", minLength: 6})} error={Boolean(errors.password)} helperText={errors.password?.message}/>
                <TextField className='my-2 mx-2' label="Confirm Password" variant="standard" type="password" name='cpassword'  {...register("cpassword",{required: "Confirm your Password", minLength: 6})} error={Boolean(errors.cpassword)} helperText={errors.cpassword?.message}/>                            
              </div>
              <div className="col-4 d-flex flex-column">
                <TextField className='my-2' label="Age" variant="standard" type="number" name='age' {...register("age",{required: "Enter your Age"})} error={Boolean(errors.age)} helperText={errors.age?.message}/>
                <FormControl sx={{ mt: 3, minWidth: 90 }} error={Boolean(errors.gender)}>
                  <InputLabel id="demo-simple-select-autowidth-label">Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    autoWidth
                    name='gender' 
                    defaultValue=''
                    label="Gender"
                    {...register("gender",{required: "Select your Gender"})}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                  <FormHelperText>{errors.gender?.message}</FormHelperText>
                </FormControl>             
              </div>
            </div>
          </div>
          <Signupaddprofilepic activestep={activeStep}/>
          <Signupaddmoreinfo activestep={activeStep}/>

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 0 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            {activeStep !== steps.length - 1 && <Button type="submit">
              Next
              {/* {activeStep === steps.length - 1 ? 'Finish' : 'Next'} */}
            </Button>}
          </Box>
          </form>
        </React.Fragment>
      )}
    </Box>
    </>
  );
}
