---
layout: ../../layouts/Blogpost.astro
title: 'Getting started with Kubernetes & Microk8s'
description: 'Installing and deploying a hello-world docker on microk8s.'
pubDate: 'Sept 08 2022'
jpn: 'https://qiita.com/dabiddo/items/9b11d93fb1b6d59d8d84'
image:
    url: 'https://astro.build/assets/blog/astro-1-release-update/cover.jpeg' 
    alt: 'Placeholder Image.'
---

### Getting to know kubernetes

For the most part, I followed this tutoria from <u>[David Tippet](https://blog.tippybits.com/installing-kubernetes-in-virtualbox-3d49f666b4d6)</u>
to install and correctly configure the ports for microk8s on virtualbox.<br/>

I followed the tutorial using Ubuntu 22.04 LTS, and everything worked as expected.<br/>
The only thing changed was how to get the MicoK8s token.<br/>
For that I did it with this command<br/>
`microk8s config`

### Doing a Hello World deployment
In order to understand how to deploy a docker image, there is a little tutorial from the official microk8s documentation<br/>
<u>[First service in Kubernetes](https://ubuntu.com/tutorials/install-a-local-kubernetes-with-microk8s#5-host-your-first-service-in-kubernetes).</u><br/>
This tutorial uses the cli to do the deployment, but with those steps you can do it from the dashboard itself<br/>

#### Log Into the Dashboard
Once you log into the kubernetes dashboard, head to `<deployments>` on the left side menu.<br/>
From here, click the `<add new resource>` button on the top-right.<br/>

<img oncontextmenu="return false;" src="https://media.publit.io/file/w_1280/microk8s_1.png" srcset="https://media.publit.io/file/w_320/microk8s_1.png 320w, https://media.publit.io/file/w_640/microk8s_1.png 640w, https://media.publit.io/file/w_1024/microk8s_1.png 1024w, https://media.publit.io/file/w_1280/microk8s_1.png 1280w" sizes="(max-width: 710px) 100vw,40vw" alt="microk8s_1" />

Fill in the form and the docker image `use the image + tag` for the container image, since the example does not have a tag, docker generates a random one, and set the ports to 80/80<br/>
<img oncontextmenu="return false;" src="https://media.publit.io/file/w_640/microk8s_3.png" srcset="https://media.publit.io/file/w_320/microk8s_3.png 320w, https://media.publit.io/file/w_640/microk8s_3.png 640w" sizes="(max-width: 710px) 100vw,40vw" alt="microk8s_3" />

From here, fill in the rest of the form and click `<Show Advance Configuration>`, change the deployment namespace to `default`<br/>

<img oncontextmenu="return false;" src="https://media.publit.io/file/w_640/microk8s_4.png" srcset="https://media.publit.io/file/w_320/microk8s_4.png 320w, https://media.publit.io/file/w_640/microk8s_4.png 640w" sizes="(max-width: 710px) 100vw,40vw" alt="microk8s_4" />

Once everything is correct, click on the `<deploy>` button and head to the ssh cli and run the namespace command.<br/>
`microk8s kubectl get all --all-namespaces`.<br/>
This will list all the namespaces and you will see you new `pod` with the given port by kubernetes.<br/>
<img oncontextmenu="return false;" src="https://media.publit.io/file/w_1024/microk8s_6.png" srcset="https://media.publit.io/file/w_320/microk8s_6.png 320w, https://media.publit.io/file/w_640/microk8s_6.png 640w, https://media.publit.io/file/w_1024/microk8s_6.png 1024w" sizes="(max-width: 710px) 100vw,40vw" alt="microk8s_6" />
<br/>
Add this port to the list of port-forwards on virtual-box, and you will be able to see the `hello world` docker running from your kubernetes node.
<img oncontextmenu="return false;" src="https://media.publit.io/file/w_640/microk8s_7.png" srcset="https://media.publit.io/file/w_320/microk8s_7.png 320w, https://media.publit.io/file/w_640/microk8s_7.png 640w" sizes="(max-width: 710px) 100vw,50vw" alt="microk8s_7" />
You should be able to see the `hello-world`message on the browser
<img oncontextmenu="return false;" src="https://media.publit.io/file/microk8s_8.png" alt="microk8s_8" />

If you do not see the message, restart the proxy on the microk8s virtual box.
