FROM openjdk:17
VOLUME /tmp
WORKDIR /BE
ARG JAR_FILE=target/web_backend.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar","app.jar"]
EXPOSE 8181

