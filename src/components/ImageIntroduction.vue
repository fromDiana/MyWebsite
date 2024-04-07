<template>
     <div class="background">
        <div class="main-section">
            <div class="text">
                Hi, I’m Diana. <br/>
                I’m a student, <br/>
                web & game developer, <br/>
                teacher.
                <a style="font-size: 16px; font-weight: normal; width: fit-content" href="#profile-intro">Find out more</a>
            </div>
            <img src="@/assets/theme/pink_girl_circle_white.png">
        </div>
     </div>
</template>

<script>
export default {
  name: 'ImageIntroduction'
}
</script>

<style scoped>
.background {
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('@/assets/theme/introduction_background.png') rgba(0, 0, 0, 0.345) 50% / cover no-repeat;
    background-blend-mode: multiply, color-dodge;
    width: 100vw;
    height: 100vh;
}
.main-section {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5rem;
}
.text{
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #FFF;
    text-shadow: 
    -3px -3px 0 #000,  
     3px -3px 0 #000,
    -3px  3px 0 #000,
     3px  3px 0 #000; /* Outline effect */
    font-size: 4rem;
    font-weight: 700;
    text-align: left;
}
img {
    width: 30rem;
    height: 30rem;
    background-size: cover;
}

@media(max-width: 500px){
    .main-section {
        flex-direction: column-reverse;
    }
    img {
        width: 15rem;
        height: 15rem;
    }
    .text {
        font-size: 1.8rem;
    }
}

@media(max-width: 1300px) and (min-width: 500px){
    .text {
        font-size: 3rem;
    }
    img {
        width: 20rem;
        height: 20rem;
    }
}
</style>