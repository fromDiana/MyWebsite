<template>
    <footer class="social-footer">
        <div class="social-icons">
            <a href="https://www.facebook.com/profile.php?id=100012116885100" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-facebook-square"></i>
            </a>
            <a href="https://www.instagram.com/dia.orsolyova/" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com/in/diana-or%C5%A1olyov%C3%A1-099292276/" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com/diana2482" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-github-square"></i>
            </a>
            <!-- <a href="mailto:orsolyovadianka@gmail.com" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-google"></i>
            </a> -->
        </div>
    </footer>
</template>

<script>
export default {
    name: 'FooterComponent'
}
</script>

<style>
.social-footer {
    width: 100%;
    padding: 20px 0;
    text-align: center;
}

.social-icons {
    display: inline-flex;
    gap: 20px;
}

.social-icons a {
    color: #fff;
    font-size: 24px;
}
</style>