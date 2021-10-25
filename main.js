song1="";
song2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;
function preload()
{
    song1= loadSound("harry_potter_theme.mp3");
    song2= loadSound("into-the-unknown.mp3");
}
function setup()
{
    canvas= createCanvas(500,350);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
}
function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        scoreLeftWrist= results[0].pose.keypoints[9].score;
        scoreRightWrist= results[0].pose.keypoints[10].score;
        console.log("score right Wrist= "+scoreRightWrist);
        console.log("score Left Wrist= "+scoreLeftWrist);
        leftWristX= results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.leftWrist.y;
        console.log("leftWristX="+leftWristX+"leftWristY="+leftWristY);
        rightWristX= results[0].pose.rightWrist.x;  
        rightWristY= results[0].pose.rightWrist.y;
        console.log("rightWristX="+rightWristX+"rightWristY="+rightWristY);
    }
}
function modelLoaded()
{
    console.log("Model Loaded!");
}
function draw()
{
    image(video, 0,0,500,350);
    fill("#ff0000");
    stroke("#ff0000");
    if(scoreLeftWrist>0.2)
    {
        circle(leftWristX,leftWristY,20);
        song1.stop();
        if(song2.isPlaying()==false)
        {
            song2.play();
            document.getElementById("song").innerHTML="Song= Into The Unknown";
        }
    }
    if(scoreRightWrist>0.2)
    {
        circle(rightWristX,rightWristY,20);
        song2.stop();
        if(song1.isPlaying()==false)
        {
            song1.play();
            document.getElementById("song").innerHTML="Song= Harry Potter Theme Song";
        }
    }
}