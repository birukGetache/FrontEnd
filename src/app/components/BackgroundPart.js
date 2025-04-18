"use client"
import React, { useEffect } from 'react';

const Background = () => {
  useEffect(() => {
    const backgroundImages = document.querySelectorAll('.ts-background-image');
    backgroundImages.forEach(image => {
      const duration = Math.floor(Math.random() * 10) + 5;
      image.style.animationDuration = `${duration}s`;

      if (image.getAttribute('data-bg-opacity')) {
        image.style.opacity = image.getAttribute('data-bg-opacity');
      }

      const wrapper = document.createElement('div');
      wrapper.className = 'ts-shape';
      image.parentNode.insertBefore(wrapper, image);
      wrapper.appendChild(image);
    });

    const bgElements = document.querySelectorAll('[data-bg-color], [data-bg-image], [data-bg-particles]');
    bgElements.forEach(element => {
      if (element.classList.contains('ts-separate-bg-element')) {
        const backgroundDiv = document.createElement('div');
        backgroundDiv.className = 'ts-background';
        element.appendChild(backgroundDiv);

        if (element.getAttribute('data-bg-color')) {
          backgroundDiv.style.backgroundColor = element.getAttribute('data-bg-color');
        }

        if (element.getAttribute('data-bg-image') !== undefined) {
          const bgImageDiv = document.createElement('div');
          bgImageDiv.className = 'ts-background-image';
          backgroundDiv.appendChild(bgImageDiv);

          bgImageDiv.style.backgroundImage = `url(${element.getAttribute('data-bg-image')})`;
          bgImageDiv.style.backgroundSize = element.getAttribute('data-bg-size');
          bgImageDiv.style.backgroundPosition = element.getAttribute('data-bg-position');
          bgImageDiv.style.opacity = element.getAttribute('data-bg-image-opacity');
          bgImageDiv.style.backgroundRepeat = element.getAttribute('data-bg-repeat');
          bgImageDiv.style.backgroundBlendMode = element.getAttribute('data-bg-blend-mode');

          if (element.getAttribute('data-bg-parallax') !== undefined) {
            bgImageDiv.classList.add('ts-parallax-element');
          }
        }
      } else {
        if (element.getAttribute('data-bg-color') !== undefined) {
          element.style.backgroundColor = element.getAttribute('data-bg-color');
          if (element.classList.contains('btn')) {
            element.style.borderColor = element.getAttribute('data-bg-color');
          }
        }

        if (element.getAttribute('data-bg-image') !== undefined) {
          element.style.backgroundImage = `url(${element.getAttribute('data-bg-image')})`;
          element.style.backgroundSize = element.getAttribute('data-bg-size');
          element.style.backgroundRepeat = element.getAttribute('data-bg-repeat');
          element.style.backgroundPosition = element.getAttribute('data-bg-position');
          element.style.backgroundBlendMode = element.getAttribute('data-bg-blend-mode');
        }
      }
    });
  }, []);

  return (
    <div className="ts-background ts-shapes-canvas position-fixed ts-separate-bg-element" data-bg-color="#fff">
      <div className="ts-background-image ts-animate ts-scale" data-bg-image="/assets/img/bg/14.png" data-bg-opacity=".1"></div>
      <div className="ts-background-image ts-animate ts-bounce" data-bg-image="/assets/img/bg/13.png"></div>
      <div className="ts-background-image ts-animate ts-scale" data-bg-image="/assets/img/bg/12.png" data-bg-opacity=".3"></div>
      <div className="ts-background-image ts-animate ts-scale" data-bg-image="/assets/img/bg/11.png"></div>
      <div className="ts-background-image ts-animate ts-bounce" data-bg-image="/assets/img/bg/10.png"></div>
      <div className="ts-background-image ts-animate ts-bounce" data-bg-image="/assets/img/bg/9.png" data-bg-opacity=".8"></div>
      <div className="ts-background-image ts-animate ts-bounce" data-bg-image="/assets/img/bg/8.png" data-bg-opacity=".8"></div>
      <div className="ts-background-image ts-animate ts-bounce" data-bg-image="/assets/img/bg/7.png"></div>
      <div className="ts-background-image ts-animate ts-bounce" data-bg-image="/assets/img/bg/6.png" data-bg-opacity=".8"></div>
      <div className="ts-background-image ts-animate" data-bg-image="/assets/img/bg/5.png" data-bg-opacity=".8"></div>
      <div className="ts-background-image ts-animate ts-bounce" data-bg-image="/assets/img/bg/4.png"></div>
      <div className="ts-background-image ts-animate ts-bounce" data-bg-image="/assets/img/bg/3.png" data-bg-opacity=".8"></div>
      <div className="ts-background-image ts-animate ts-bounce" data-bg-image="/assets/img/bg/2.png"></div>
      <div className="ts-background-image ts-animate ts-bounce" data-bg-image="/assets/img/bg/1.png" data-bg-opacity=".8"></div>
    </div>
  );
};

export default Background;