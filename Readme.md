<h1> What the heck is this? </h1>
<p>A simple back-end support for novel app project, allow to crawl from many source and hot plug new source without restart server</p>
<h2> How to use </h2>
<li>
    Run "node app.js" to start server
</li>
<li>
   request url: http://localhost:3000/?novelName=@novelName&chapter=@chapter
    For example: http://localhost:3000/?novelName=ngao-the-dan-than&chapter=5
</li>
<li>
   Crawl code is in controller
</li>
<li>
    No routing yet (maybe dont need??)
</li>
<li>
    Current only truyenfull supported, so every source will return content from truyenfull
</li>
