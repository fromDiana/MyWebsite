<template>
     <div class="background">
        <div class="main-section">
            <p class="text">
                Hi, I’m Diana. <br>
                I’m a student, <br>
                web & game developer, <br>
                teacher.
            </p>
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
    background: url('@/assets/theme/introduction_background.png') rgba(0, 0, 0, 0.468) 50% / cover no-repeat;
    background-blend-mode: multiply, color-dodge;
    width: 100%;
    height: 100vh;
}
.main-section {
    display: flex;
    padding: 15.5625rem 0.625rem;
    justify-content: center;
    align-items: center;
    gap: 3rem;
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

}
img {
    width: 30rem;
    height: 30rem;
    background-size: cover;
}
</style>