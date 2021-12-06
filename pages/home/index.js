import React from 'react';
import HomeComponent from '../../components/HomeComponent/HomeComponent';
/*export async function getServerSideProps(){
    
    const res=await fetch("http://127.0.0.1:3333/post/getpost");
    
    const data=await res.json();
    return {
        props:{
            data
        }
     
    }
  }
  */
const index = () => { 
   

    return (
        <HomeComponent></HomeComponent>
        
    );
};

export default index;