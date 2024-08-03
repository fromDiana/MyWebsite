<template>
    <footer class="social-footer">
        <div class="social-icons">
            <a href="https://www.instagram.com/fromdiana_/" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-instagram"></i>
            </a>
            <a href="https://www.youtube.com/channel/UCcX7sWdUtMZoxHnRhhfaB8g?sub_confirmation=1" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-youtube"></i>
            </a>
            <a href="https://www.tiktok.com/@fromdiana_" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-tiktok"></i>
            </a>
            <a href="https://www.linkedin.com/in/diana-or%C5%A1olyov%C3%A1-099292276/" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com/fromDiana" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-github-square"></i>
            </a>
            <a href="https://www.patreon.com/fromDiana" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-patreon"></i>
            </a>
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