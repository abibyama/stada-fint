import React from 'react';
import styles from './About.module.css';


const image1= "https://hips.hearstapps.com/hmg-prod/images/cleaning-experts-essentials-buys-1657632352.jpg"
const image2 = "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"

function About() {
  return (
    <div className={styles['about-container']}>
      <h1 className={styles['about-heading']}>About</h1>
      <div className={styles['about-content']}>
        <div className={styles['about-text']}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut convallis, lorem ut tempus hendrerit, lectus nisi malesuada massa, quis pellentesque nulla tortor ac nibh.</p>
          <p>Phasellus viverra eros id sapien laoreet, ac rutrum metus blandit. Aenean aliquet, leo vel pharetra venenatis, urna lorem gravida nisi, vitae laoreet ex enim in felis.</p>
        </div>
        <div className={styles['about-images']}>
          <img src={image2} alt="Cleaning" className={styles['about-image']} />
          <img src={image1} alt="Cleaning" className={styles['about-image']} />
        
        </div>
      </div>
      
    </div>
  );
}

export default About;
