<template>
    <div class="container">
        <h3 style="margin-top: 5rem;max-width: 700px; text-align: justify">Visual programming has been around for a long time and is a powerful tool for educational purposes.
It offers an intuitive and engaging way to learn programming. This thesis focuses on the core challenges beginners face
when learning programming and how visual programming can help with helping them understand basic principles.
To understand the problem, we first analyze the current state of educational applications and identify
the most common mistakes by working with the target group. Based on the findings, we propose a solution that tries to minimize these mistakes.
Implementation of the application is followed by a detailed analysis of the use cases.
In the end, we evaluate the application with the target group and summarize the results.<br>
Here is the data we collected:</h3>
        <h1>Task Completion Data</h1>
        <div v-for="chapter in structuredData" :key="chapter.chapterNumber" class="chapter-table">
            <h2>Chapter {{ chapter.chapterNumber }}</h2>
            <table>
                <tr>
                    <th></th>
                    <th v-for="i in 5" :key="'header' + i">Level {{ i - 1 }}</th>
                </tr>
                <tr>
                    <td><strong>Best Time:</strong></td>
                    <td v-for="(level, index) in chapter.levels.slice(0, 5)" :key="'bestTime' + index">
                        {{ level.bestCompletionTime }}
                    </td>
                </tr>
                <tr>
                    <td><strong>Average Time:</strong></td>
                    <td v-for="(level, index) in chapter.levels.slice(0, 5)" :key="'avgTime' + index">
                        {{ level.averageCompletionTime }}
                    </td>
                </tr>
                <tr>
                    <td><strong>Average Attempts:</strong></td>
                    <td v-for="(level, index) in chapter.levels.slice(0, 5)" :key="'avgAttempts' + index">
                        {{ level.averageAttempts }}
                    </td>
                </tr>
                <tr>
                    <th></th>
                    <th v-for="i in 5" :key="'header' + (i + 5)">Level {{ i + 4 }}</th>
                </tr>
                <tr>
                    <td><strong>Best Time:</strong></td>
                    <td v-for="(level, index) in chapter.levels.slice(5, 10)" :key="'bestTime' + (index + 5)">
                        {{ level.bestCompletionTime }}
                    </td>
                </tr>
                <tr>
                    <td><strong>Average Time:</strong></td>
                    <td v-for="(level, index) in chapter.levels.slice(5, 10)" :key="'avgTime' + (index + 5)">
                        {{ level.averageCompletionTime }}
                    </td>
                </tr>
                <tr>
                    <td><strong>Average Attempts:</strong></td>
                    <td v-for="(level, index) in chapter.levels.slice(5, 10)" :key="'avgAttempts' + (index + 5)">
                        {{ level.averageAttempts }}
                    </td>
                </tr>
            </table>
        </div>
        <div class="mini-tables">
            <div v-for="item in rawData" :key="item.id" class="mini-table">
                <p><strong>ID:</strong> {{ item.id }}</p>
                <p><strong>Time:</strong> {{ item.completion_time }}</p>
                <p><strong>Attempts:</strong> {{ item.attempts }}</p>
                <p><strong>Chapter:</strong> {{ item.chapter }}</p>
                <p><strong>Level:</strong> {{ item.level }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'ThesisPage',
    data() {
        return {
            rawData: [],
            structuredData: []
        };
    },
    methods: {
        async fetchData() {
            try {
                const response = await axios.get('https://j7u2o5xs0h.execute-api.eu-west-3.amazonaws.com/prod', {
                    headers: {
                        'x-api-key': '2vMOtvYfZK7gjaAjdrjsg5GbHQefP1um9U0Eqaw0',
                        'Content-Type': 'application/json'
                    }
                });

                this.rawData = response.data.body;
                this.structureData();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        structureData() {
            // Initialize structured data
            const chapters = Array.from({ length: 5 }, (_, i) => ({
                chapterNumber: i, // Start from 0
                levels: Array.from({ length: 10 }, (_, j) => ({
                    levelNumber: j, // Start from 0
                    bestCompletionTime: null,
                    totalCompletionTime: 0,
                    attemptCount: 0,
                    bestAttempts: null,
                    completionTimes: [], // To store all completion times for average calculation
                    attempts: [] // To store all attempts for average calculation
                }))
            }));
            console.log(chapters);

            // Process raw data to fill structured data
            this.rawData.forEach(item => {
                const chapter = chapters[item.chapter];
                const level = chapter.levels[item.level];

                // Update best completion time
                if (level.bestCompletionTime === null || item.completion_time < level.bestCompletionTime) {
                    level.bestCompletionTime = item.completion_time;
                }

                // Update best attempts
                if (level.bestAttempts === null || item.attempts < level.bestAttempts) {
                    level.bestAttempts = item.attempts;
                }

                // Add completion time and attempts to arrays
                if (item.completion_time !== null) {
                    level.completionTimes.push(item.completion_time);
                }
                if (item.attempts !== null) {
                    level.attempts.push(item.attempts);
                }
            });

            // Calculate averages
            chapters.forEach(chapter => {
                chapter.levels.forEach(level => {
                    if (level.completionTimes.length > 0) {
                        level.averageCompletionTime = (level.completionTimes.reduce((a, b) => a + b, 0) / level.completionTimes.length).toFixed(2);
                    } else {
                        level.averageCompletionTime = null;
                    }
                    if (level.attempts.length > 0) {
                        level.averageAttempts = (level.attempts.reduce((a, b) => a + b, 0) / level.attempts.length).toFixed(2);
                    } else {
                        level.averageAttempts = null;
                    }
                });
            });

            this.structuredData = chapters;
        }
    },
    mounted() {
        this.fetchData();
    }
}
</script>

<style>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    max-width: 90%;
}

.chapter-table {
    /* margin-bottom: 2rem; */
    width: auto;
}

table {
    border-collapse: collapse;
    /* margin-bottom: 1rem; */
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
}

th {
    background-color: #58004f;
}

.mini-tables {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    width: 100%;
    margin-top: 2rem;
}

.mini-table {
    border: 1px solid #ddd;
    padding: 1rem;
}

.mini-table p {
    margin: 0.5rem 0;
}
</style>