pipeline {

    agent any

    tools {
        nodejs "node"
    }

    options {
        skipDefaultCheckout true
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Initialize') {
            steps {
                sh '''
                npm install
                '''
            }
        }
        stage('Test') {
            steps {
                sh '''
                npm run test ${COMMAND}
                '''
            }
            post {
              always {
                publishHTML (target: [
                    allowMissing         : false,
                    alwaysLinkToLastBuild: false,
                    keepAll             : true,
                    reportDir            : 'results',
                    reportFiles          : 'test-report.html',
                    reportName           : 'Test Report'
                ])
                publishHTML (target: [
                    allowMissing         : false,
                    alwaysLinkToLastBuild: false,
                    keepAll             : true,
                    reportDir            : 'results',
                    reportFiles          : 'LightHouseReport.html',
                    reportName           : 'LightHouse Report'
                ])
              }
            }
        }
    }

}