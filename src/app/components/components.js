import styled from 'styled-components';

export const Container = styled.div`
background-color: #525e67;
backdrop-filter: 'blur(40px)';
border-radius: 10px;
box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
position: relative;
overflow: hidden;
width: 678px;
 font-family: cursive, sans-serif;
max-width: 100%;
min-height: 400px;
 font-family: cursive, sans-serif;
`;

export const SignUpContainer = styled.div`
 position: absolute;
 top: 0;
 height: 100%;
 transition: all 0.6s ease-in-out;
 left: 0;
 width: 50%;
  font-family: cursive, sans-serif;
 opacity: 0;
 z-index: 1;
 ${props => props.signinIn !== true ? `
   transform: translateX(100%);
   opacity: 1;
   z-index: 5;
 ` 
 : null}
`;


export const SignInContainer = styled.div`
position: absolute;
top: 0;
height: 100%;
transition: all 0.6s ease-in-out;
left: 0;
width: 50%;
 font-family: cursive, sans-serif;
z-index: 2;
${props => (props.signinIn !== true ? `transform: translateX(100%);` : null)}
`;
export const Form = styled.form`
background-color: #b5bcbf;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
padding: 0 50px;
 font-family: cursive, sans-serif;
height: 100%;
text-align: center;
`;

export const Title = styled.h5`
font-weight: bold;
 font-family: cursive, sans-serif;
margin: 0;
`;

export const Input = styled.input`
background-color: #eee;
border: none;
padding: 12px 15px;
margin: 8px 0;
 font-family: cursive, sans-serif;
width: 100%;
border-radius:10px;
`;


export const Button = styled.button`
   border-radius: 20px;
   border: 1px solid #ff4b2b;
   background-color: #ff4b2b;
   color: #ffffff;
   font-size: 12px;
   font-weight: bold;
   padding: 12px 45px;
    font-family: cursive, sans-serif;
   letter-spacing: 1px;
   text-transform: uppercase;
    font-family: cursive, sans-serif;
   transition: transform 80ms ease-in;
   &:active{
       transform: scale(0.95);
   }
   &:focus {
       outline: none;
   }
`;
export const GhostButton = styled(Button)`
background-color: transparent;
 font-family: cursive, sans-serif;
border-color: #ffffff;
`;

export const Anchor = styled.a`
color: #333;
font-size: 14px;
text-decoration: none;
margin: 15px 0;
 font-family: cursive, sans-serif;
`;
export const OverlayContainer = styled.div`
position: absolute;
top: 0;
left: 50%;
width: 50%;
height: 100%;
 font-family: cursive, sans-serif;
overflow: hidden;
transition: transform 0.6s ease-in-out;
z-index: 100;
${props =>
 props.signinIn !== true ? `transform: translateX(-100%);` : null}
`;

export const Overlay = styled.div`
background: #ff416c;
background: -webkit-linear-gradient(to right, #0060b0, #0060b0);
background: linear-gradient(to right, #0060b0, #0060b0);
background-repeat: no-repeat;
background-size: cover;
background-position: 0 0;
color: #ffffff;
position: relative;
 font-family: cursive, sans-serif;
left: -100%;
height: 100%;
width: 200%;
transform: translateX(0);
transition: transform 0.6s ease-in-out;
${props => (props.signinIn !== true ? `transform: translateX(50%);` : null)}
`;

export const OverlayPanel = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
     font-family: cursive, sans-serif;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
`;

export const LeftOverlayPanel = styled(OverlayPanel)`
 font-family: cursive, sans-serif;
  transform: translateX(-20%);
  ${props => props.signinIn !== true ? `transform: translateX(0);` : null}
`;

export const RightOverlayPanel = styled(OverlayPanel)`
    right: 0;
    transform: translateX(0);
     font-family: cursive, sans-serif;
    ${props => props.signinIn !== true ? `transform: translateX(20%);` : null}
`;

export const Paragraph = styled.p`
font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px
   font-family: cursive, sans-serif;
`;