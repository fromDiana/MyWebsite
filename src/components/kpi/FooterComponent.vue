<template>
    <footer>
        <div class="footer-content">

            <div class="icons-left">
                <a href="https://mais.tuke.sk/"><img src="@/assets/footerIcons/mais.png" alt="Mais" title="MAIS"></a>
                <a href="https://moodle.fei.tuke.sk/"><img src="@/assets/footerIcons/moodle.png" alt="Moodle" title="KPI Moodle"></a>
                <a href="https://git.kpi.fei.tuke.sk/"><img src="@/assets/footerIcons/gitlab.png" alt="GitLab" title="KPI Gitlab"></a>
                <a href="http://www.tuke.sk/"><img src="@/assets/footerIcons/tuke.png" alt="Tuke" title="TUKE"></a>
                <a href="http://www.fei.tuke.sk/"><img src="@/assets/footerIcons/fei.jpg" alt="FEI" title="FEI"></a>
            </div>

            <div class="text-center">
                @2023 KPI FEI TUKE
            </div>

            <div class="icons-right">
                <a href="https://www.facebook.com/kpi.fei.tuke" title="Facebook"><img src="@/assets/footerIcons/facebook.png" alt="Facebook"></a>
                <a href="http://www.twitter.com/KPI_FEI_TUKE" title="Twitter"><img src="@/assets/footerIcons/twitter.png" alt="Twitter"></a>
                <a href="http://www.instagram.com/kpi_fei_tuke" title="Instagram"><img src="@/assets/footerIcons/instagram.png" alt="Instagram"></a>
                <a href="http://www.youtube.com/channel/UCcJFOmxCzDqIeF76SKw_dnQ" title="Youtube (Channel)"><img src="@/assets/footerIcons/youtube.png" alt="Youtube"></a>
                <a href="http://www.linkedin.com/company/katedra-počítačov-a-informatiky-kpi-fei-tuke" title="LinkedIn"><img src="@/assets/footerIcons/linkedin.png" alt="LinkedIn"></a>
                <a href="https://play.google.com/store/apps/dev?id=7856447508542981978" title="Google Play"><img src="@/assets/footerIcons/google-play.png" alt="Google Play"></a>
            </div>

        </div>
    </footer>
</template>
  

<script>
export default {
}
</script>

<style scoped>
footer {
    background-color: #e2dfdf;
    color: black;
  /* padding: 10px 70px 10px 70px; */
  padding: 10px 5vw 10px 5vw;
}

.footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.icons-left,
.icons-right {
    display: flex;
    gap: 10px;
}

.text-center {
    text-align: center;
    flex-grow: 1;
}

@media (max-width: 750px) {
    .footer-content {
        flex-direction: column;
    }

    .icons-left,
    .icons-right {
        justify-content: center;
        padding: 5px 0;
    }

    .text-center {
        order: 2;
        padding: 10px 0;
    }

    .icons-left {
        order: 1;
    }

    .icons-right {
        order: 3;
    }
}
</style>
