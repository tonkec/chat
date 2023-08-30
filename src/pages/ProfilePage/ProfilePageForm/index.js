import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../store/actions/user';
import {Formik, useFormik} from 'formik';
import { UserProfileDetails } from '../../../components/validations/profileValidation';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

const ProfilePageForm = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userReducer.user);
  
  


    const { values, handleBlur, handleChange, handleSubmit, errors, touched, resetForm} = useFormik({
      initialValues: {
        name: currentUser.username || '',
        bio: currentUser.bio || '',
        sex: currentUser.sexuality ||'',
        rod: currentUser.gender ||'',
        lokacija: currentUser.location ||'',
        dob: currentUser.age ||''
      },
      validationSchema: UserProfileDetails,
      onSubmit: (values, {resetForm}) => {
        const e = window.event;
        e.preventDefault();
        
        const data = {
          username: values.name,
          bio: values.bio,
          gender: values.sex,
          sexuality: values.rod,
          location: values.lokacija,
          age: values.dob
        }
        

    dispatch(updateUser(data));
    onSubmit();

      }
    });
    console.log(errors);
    return (
      <form onSubmit={handleSubmit} autoComplete="off" >
        <label htmlFor="name">Username</label>
        <InputText
          type="text"
          style={
            errors.name 
            && 
            touched.name 
            ? 
            {borderColor: '#fc8181', width: '100%', marginBottom: '0.1vw'} 
            : 
            {width: '100%', marginBottom: 15, borderolor: ''}}
          placeholder="tvoj username"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
          id="name"
        />
        {errors.name && touched.name && <p style={{ color: '#fc8181', fontSize: '1vw',textAlign: 'left', marginTop: '0.25rem'}}>{errors.name}</p>}
        <label htmlFor="bio">Bio</label>
        <InputTextarea
          style={errors.bio && touched.bio ? {borderColor: '#fc8181', width: '100%', marginBottom: '0.1vw'}  : { width: '100%', marginBottom: 15 }}
          placeholder="tvoj bio"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.bio}
          rows={10}
          id="bio"
        />
        {errors.bio && touched.bio && <p style={{ color: '#fc8181', fontSize: '1vw',textAlign: 'left', marginTop: '0.25rem'}}>{errors.bio.message}</p>}
    
    
        <label htmlFor="sex">Seksualnost</label>
        <InputText
          type="text"
          style={errors.sex && touched.sex ? {borderColor: '#fc8181', width: '100%', marginBottom: '0.1vw'}  : { width: '100%', marginBottom: 15 }}
          placeholder="tvoja seksualnost"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.sex}
          id="sex"
        />
        {errors.sex && touched.sex && <p style={{ color: '#fc8181', fontSize: '1vw',textAlign: 'left', marginTop: '0.25rem'}}>{errors.sex}</p>}
        
        <label htmlFor="rod">Rod</label>
        <InputText
          type="text"
          style={errors.rod && touched.rod ? {borderColor: '#fc8181', width: '100%', marginBottom: '0.1vw'}  : { width: '100%', marginBottom: 15 }}
          placeholder="tvoj rod"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.rod}
          id="rod"
        />
  {errors.rod && touched.rod && <p style={{ color: '#fc8181', fontSize: '1vw',textAlign: 'left', marginTop: '0.25rem'}}>{errors.rod}</p>}
        
        <label htmlFor="lokacija">Lokacija</label>
        <InputText
          type="text"
          style={errors.lokacija && touched.lokacija ? {borderColor: '#fc8181', width: '100%', marginBottom: '0.1vw'}  : { width: '100%', marginBottom: 15 }}
          placeholder="Tvoja lokacija"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.lokacija}
          id="lokacija"
        />
  {errors.lokacija && touched.lokacija && <p style={{ color: '#fc8181', fontSize: '1vw',textAlign: 'left', marginTop: '0.25rem'}}>{errors.lokacija}</p>}
        
        <label htmlFor="dob">Dob</label>
        <InputText
          type="number"
          style={errors.dob && touched.dob ? {borderColor: '#fc8181', width: '100%', marginBottom: '0.1vw'}  : { width: '100%', marginBottom: 15 }}
          placeholder="Tvoja dob"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.dob}
          id="dob"
        />
  {errors.dob && touched.dob && <p style={{ color: '#fc8181', fontSize: '1vw',textAlign: 'left', marginTop: '0.25rem'}}>{errors.dob}</p>}
        
        <Button type="submit" label="Izmijeni" />
      </form>
    );
  

  

 
};

export default ProfilePageForm;
