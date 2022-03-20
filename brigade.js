const { events, Job } = require("brigadier");

events.on("simpleevent", (e, project) => {
  var job = new Job("build-ddcv-env", "docker:dind");
  const payload = JSON.parse(e.payload)

  job.docker.enabled = true;

  // if (payload.task == "builder") {
  //   var containerenv = "core.harbor.markmarryatt.me/markm-home/datadrivencv-builder:latest";
  //   job.tasks = [
  //     "docker build -t " + containerenv + " /src/. -f /src/Dockerfile"
  //   ]
    
  // } else if (payload.task == "ngnix") {
  //   var containerenv = "core.harbor.markmarryatt.me/markm-home/datadrivencv-nginx:latest";
  //   job.tasks = [
  //     "docker build -t " + containerenv + " /src/. -f /src/Dockerfile.nginx --no-cache"
  //   ]
  // }
  
  
  if (payload.DOCKER_USER) {
    job.env.DOCKER_USER = payload.DOCKER_USER
    job.env.DOCKER_PASS = payload.DOCKER_PASS
    job.env.DOCKER_REGISTRY = payload.DOCKER_REGISTRY
    job.tasks.push("docker login -u $DOCKER_USER -p $DOCKER_PASS $DOCKER_REGISTRY")
    job.tasks.push("docker push " + containerenv)
  } else {
    console.log("skipping push. DOCKER_USER is not set.");
  }

  job.run();
});
