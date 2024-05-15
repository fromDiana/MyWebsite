<template>
    <header :class="{ hidden: isHidden }">
        <a href="/"><img src="@/assets/theme/pink_girl_circle_white.png" alt="Logo" class="logo" /></a>
        <nav>
            <ul>
                <li><a href="/#profile-intro">Intro</a></li>
                <li><a href="/#work-experience">Work Exp</a></li>
                <li><a href="/#portfolio">Portfolio</a></li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    data() {
        return {
            lastScrollPosition: 0,
            isHidden: false
        };
    },
    created() {
        window.addEventListener('scroll', this.handleScroll);
    },
    unmounted() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll() {
            const currentScrollPosition = window.scrollY || document.documentElement.scrollTop;

            if (currentScrollPosition < this.lastScrollPosition) {
                this.isHidden = false; // Scrolling up
            } else if (currentScrollPosition > 100) {
                this.isHidden = true; // Scrolling down
            }

            this.lastScrollPosition = currentScrollPosition;
        }
    }
};
</script>

<style>
header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 20px 40px;
    transition: top 0.4s;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
}

header.hidden {
    top: -100%;
}

.logo {
    height: 50px;
}

nav ul {
    list-style: none;
    display: flex;
}

nav li {
    cursor: pointer;
    padding: 0 20px;
}

@media (max-width: 500px) {
    nav {
        margin: 0;
    }
    header {
        padding: 20px;
    }
    nav ul {
        display: block;
        padding-left: 0;
    }

    nav li {
        display: inline-block;
        padding: 0 10px;
    }
}
</style>