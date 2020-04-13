'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('articles', [
      {
        title: 'React 首页加载慢的问题性能优化（实际操作）',
        user_id: 1,
        abstract: '学习了一段时间React，想真实的实践一下。于是便把我的个人博客网站进行了重构。花了大概一周多时间，网站倒是重构的比较成功，但是一上线啊，那个访问速度啊，是真心慢，慢到自己都不能忍受，那么小一个网站，没几篇文章，慢成那样，不能接受',
        content_html: `<p>学习了一段时间React，想真实的实践一下。于是便把我的个人博客网站进行了重构。花了大概一周多时间，网站倒是重构的比较成功，但是一上线啊，那个访问速度啊，是真心慢，慢到自己都不能忍受，那么小一个网站，没几篇文章，慢成那样，不能接受。我不是一个追求完美的人，但这样可不行。后面大概花了一点时间进行性能的研究。才发现慢是有原因的。</p>
        <h3 id="qiyereact这类框架？">React这类框架？</h3>
        <p>目前主流的前端框架React、Vue、Angular都是采用客户端渲染（服务端渲染暂时不在本文的考虑范围内）。这当然极大的减轻了服务器的压力。相对的浏览器的压力就增加了。这就意味着大量的js文件需要在本地运行。而从服务器下载这些大的js文件需要时间。再运行这些js又需要时间。这是首页加载慢的本质原因。当然只是首页，因为后续有缓存的存在，相对就很快了。那么如何提升速度呢？无非从两个方向入手</p>
        <ul>
        <li>提高下载静态资源的速度</li>
        <li>优化代码提高运行速度</li>
        </ul>
        <p>在具体优化之前先说说我博客网站的服务器配置。</p>
        <ul>
        <li>阿里云服务器ECS</li>
        <li>系统Ubuntu 16.04</li>
        <li>CPU：1核</li>
        <li>内存：1GB</li>
        <li>MYSQL数据库</li>
        <li>Nginx版本1.16.1</li>
        </ul>
        <p>测试环境采用火狐浏览器,优化之前访问速度是这样的</p>
        <p><img src="https://immisso.oss-cn-hangzhou.aliyuncs.com/article/1021610/001.png" alt=""></p>
        <p>是不是很慢，慢到怀疑人生。一篇两千多字的博文页面加载完需要6s的时间，下面我们就从我自己的博客出发一步一步的进行优化。</p>
        <h3 id="qiye提升下载静态资源的速度">提升下载静态资源的速度</h3>
        <p>提升下载静态资源的速度的方法有很多。升级HTTP1.1到HTTP2.0,开启gzip数据压缩，上cdn等，这些都是最有效提升速度的方法。自己的网站也主要从这些方面去一一的优化来提高速度的。</p>
        <h4 id="qiye升级http11到http2">升级HTTP1.1到HTTP2</h4>
        <p>没有升级之前是这样的<br><img src="https://immisso.oss-cn-hangzhou.aliyuncs.com/article/1021610/002.png" alt=""></p>
        <p>升级到HTTP2.0之后是这样的<br><img src="https://immisso.oss-cn-hangzhou.aliyuncs.com/article/1021610/004.png" alt=""></p>
        <p>那么怎么升级呢？升级也是需要条件的。</p>
        <ul>
        <li>openssl 1.0.2+ （OpenSSL 1.0.2 开始支持 ALPN）</li>
        <li>Nginx 1.9.5+</li>
        </ul>
        <p>不知道nginx和openssl版本的可以通过<br><code>nginx -V</code><br>查看,以上的条件满足后，那就简单了，只需要在nginx配置文件中添加<code>http2</code></p>
        <pre><code class="language-nginx"><span class="hljs-section">server</span> {
           <span class="hljs-attribute">listen</span> <span class="hljs-number">443</span> ssl http2
           .
           .
           .
        }</code></pre>
        <p>即可，是不是很简单，然后再重启一下nginx服务器就可以了。（该升级对访问速度的提升不大。）</p>
        <h4 id="qiye开启gzip数据压缩">开启gzip数据压缩</h4>
        <p>从上面的图中可以看出，传输列和大小列数据都是相等的，也就是说文件多大，就传输多大，完全没有压缩，像其中1.4M这样的大文件，压缩就很有必要了。更何况这还是一个简单的博客网站。这是拖慢速度的元凶之一。所以我们很有必要进行gzip压缩。那么我们怎么开启gzip呢？是不是很难？其实也很简单，nginx原本就支持，我们只需要简单的配置就好。同样的修改nginx配置文件</p>
        <pre><code class="language-nginx"><span class="hljs-section">server</span> {
            <span class="hljs-attribute">listen</span> <span class="hljs-number">443</span> ssl http2
            <span class="hljs-comment">#...中间省略很多</span>
            gzip <span class="hljs-literal">on</span>;
            <span class="hljs-attribute">gzip_buffers</span> <span class="hljs-number">32</span> <span class="hljs-number">4k</span>;
            <span class="hljs-attribute">gzip_comp_level</span> <span class="hljs-number">6</span>;
            <span class="hljs-attribute">gzip_min_length</span> <span class="hljs-number">200</span>;
            <span class="hljs-attribute">gzip_types</span> text/css text/xml application/javascript application/json;
        }</code></pre>
        <p>其中</p>
        <ul>
        <li><code>gzip on</code>表示gzip压缩开启。</li>
        <li><code>gzip_buffers 32 4k</code>表示处理请求压缩的缓冲区数量和大小，可以不设置，使用默认值就好。</li>
        <li><code>gzip_comp_level</code>gzip压缩级别,到了等级6之后就很难提高了。</li>
        <li><code>gzip_min_length</code>当返回内容大于此值时才会使用gzip进行压缩,以K为单位,当值为0时，所有页面都进行压缩</li>
        <li><code>gzip_types</code>压缩类型</li>
        </ul>
        <p>同样的再重启一下nginx服务器就好<br><img src="https://immisso.oss-cn-hangzhou.aliyuncs.com/article/1021610/006.png" alt=""></p>
        <p>从图中可以看出，大大的提升了速度。再观察传输和大小这一栏，两者大小差异就很大了。完成了这两步，速度已经从以前的6s减少到2秒左右了。<br>（该升级对访问速度提升最大。）</p>
        <blockquote>
        <p><strong>注意：</strong> 当然更好的方法是使用cdn加速。把静态资源cdn化。更能大大的提升速度。</p>
        </blockquote>
        <h3 id="qiye优化代码提高运行速度">优化代码提高运行速度</h3>
        <p>在多次请求测试中。发现依旧有很多文件很小，但是运行起来却相当耗时，当然这和React创建DOM树等操作有关，不过我们还是可以再看看代码上有没有其他可以优化的空间。对于这么一个小网站来说也太慢了，我想我写的代码一定有很耗时的操作，果不其然。网站中这段代码</p>
        <pre><code class="language-javascript"><span class="hljs-keyword">const</span> markdownHtml = marked(content_mark || <span class="hljs-string">''</span>);</code></pre>
        <p>把markdown转成html过程中需要耗费些时间，如果文章内容很大，这个时间也是不容忽视的。<br>测试了这篇<a href="https://www.immisso.com/article/10205">JavaScript数组和字符串的常用方法以及其简单算法</a>字数比较多的文章，竟然花费了我整整100多ms，按照惯例这也是不能容忍的。</p>
        <p>这种情况我们在保存markdown的时候就可以直接保存两份数据，一份原markdown数据，一份markdown转成html后的数据。页面渲染的时候直接获转换后的html代码，这样节约了转换时间。</p>
        <p>我们还可以利用React的<code>懒加载</code>，在用webpack打包的时候进行代码的分割，减少首屏加载的体积。</p>
        <p>当然加载过程中提升用户体验也是重要的一环，虽然不能有效的提升运行速度，但可以使用户更加愉悦。所谓欢乐不觉时光过嘛。</p>
        <p>该文章会持续更新，只要有更好的提升性能的方法，我就会在自己博客网站上去实践。</p>
        <p>博客网站是采用<code>antd+umi+dva</code>阿里全家桶开发的，博客地址<a href="https://www.immisso.com">https://www.immisso.com</a><br>本人能力有限，是一个持续学习者。如果大家还有更多的优化方法请也留言教教我。。。</p>
        <p>后续我也会把博客网站代码开源出来。</p>`,
        anchor: '[{"tag":"h3","level":3,"href":"qiyereact这类框架？","title":"React这类框架？","ismain":true},{"tag":"h3","level":3,"href":"qiye提升下载静态资源的速度","title":"提升下载静态资源的速度","ismain":true,"children":[{"tag":"h4","level":4,"href":"qiye升级http11到http2","title":"升级HTTP1.1到HTTP2"},{"tag":"h4","level":4,"href":"qiye开启gzip数据压缩","title":"开启gzip数据压缩"}]},{"tag":"h3","level":3,"href":"qiye优化代码提高运行速度","title":"优化代码提高运行速度","ismain":true}]',
        like: 100,
        view: 122,
        comment: 0,
        category_id: 3,
        tag_id: 4,
      },
      {
        title: '理解Python装饰器',
        user_id: 1,
        abstract: 'Python是很具特色的一门语言。除了面向协议编程的方式，还有许多语法糖，今天要介绍的语法糖————装饰器，我们不妨以举例的方式来一步一步的深入了解装饰器。假如我们在执行函数f1,f2的时候，打印执行函数时候的时间。',
        content_html: `<p>Python是很具特色的一门语言。除了面向协议编程的方式，还有许多语法糖，今天要介绍的语法糖————装饰器</p>
        <p>我们不妨以举例的方式来一步一步的深入了解装饰器</p>
        <p>假如我们在执行函数f1,f2的时候，打印执行函数时候的时间。<br>我们很可能会这样做：</p>
        <pre><code class="language-python"><span class="hljs-comment"># 第一种</span>
        <span class="hljs-keyword">import</span> time
        
        <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">f1</span><span class="hljs-params">()</span>:</span>
            print(time.time())
            print(<span class="hljs-string">"this is f1"</span>)
        
        <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">f2</span><span class="hljs-params">()</span>:</span>
            print(time.time())
            print(<span class="hljs-string">"this is f2"</span>)
        
        f1()
        f2()</code></pre>
        <p>这样看似是没有问题的，我们也乐意这样做，因为也很简单，引入<code>time</code>模块再来一个print语句就OK了，但是如果一百个，一千个函数呢，我们还这样写吗？答案是否定的。程序员是一个&quot;偷懒&quot;的行业。能不写大量的重复代码绝对不写。那我们会想到专门写一个函数打印时间。在每个函数里调用不就可以了么。是的这样可以。代码如下</p>
        <pre><code class="language-python"><span class="hljs-comment"># 第二种</span>
        <span class="hljs-keyword">import</span> time
        
        <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">f1</span><span class="hljs-params">()</span>:</span>
            print_time()
            print(<span class="hljs-string">"this is f1"</span>)
        
        <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">f2</span><span class="hljs-params">()</span>:</span>
            print_time()
            print(<span class="hljs-string">"this is f2"</span>)
        
        <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">print_time</span><span class="hljs-params">()</span>:</span>
           print(time.time())
        
        f1()
        f2()</code></pre>
        <p>但是这样相比第一种虽然简单了，但是这样同样的增加了耦合性。每个函数都需要去修改一下，我们能不能再不修改原来函数的情况下就可以增加这个打印时间的功能呢？既然我们不修改函数，那我们修改函数的调用方式吗？</p>
        <pre><code class="language-python"><span class="hljs-comment"># 第三种</span>
        <span class="hljs-keyword">import</span> time 
        
        <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">f1</span><span class="hljs-params">()</span>:</span>
            print(<span class="hljs-string">"this is f1"</span>)
        
        <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">f2</span><span class="hljs-params">()</span>:</span>
            print(<span class="hljs-string">"this is f2"</span>)
        
        <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">print_time</span><span class="hljs-params">(f)</span>:</span>
           print(time.time())
           f()
        
        print_time(f1)
        print_time(f2)</code></pre>
        <p>第三种就好很多了，第一：没有改变原来的函数，降低了耦合。调用方法也简单了。只需要把函数名传到另一个函数里就可以了。装饰器就是采用这种，但是用起来更加方便。代码写起来也更加高大上。这样我们逐渐引出今天的主题——装饰器</p>
        <p>装饰器的写法很固定，有点像闭包(虽然没有引入环境变量)。使用装饰器也很简单只需要在需要打印时间的函数上加入<code>@装饰器名</code>。调用这个函数就能够执行对应装饰器的功能。其装饰器的基本框架如下</p>
        <pre><code class="language-python"><span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">decorator</span><span class="hljs-params">(f)</span>:</span>
            <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">wrapper</span><span class="hljs-params">()</span>:</span>
                <span class="hljs-keyword">pass</span>
                f()
            <span class="hljs-keyword">return</span> wrapper</code></pre>
        <p>那么我们对第三种代码进行装饰器的修改</p>
        <pre><code class="language-python"><span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">decorator</span><span class="hljs-params">(f)</span>:</span>
            <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">wrapper</span><span class="hljs-params">()</span>:</span>
                print(time.time())
                func(f)
            <span class="hljs-keyword">return</span> wrapper
        
        <span class="hljs-comment"># @装饰器名</span>
        
        <span class="hljs-meta">@decorator</span>
        <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">f1</span><span class="hljs-params">()</span>:</span>
            print(<span class="hljs-string">"this is name f1"</span>)
        <span class="hljs-meta">@decorator</span>
        <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">f2</span><span class="hljs-params">()</span>:</span>
            print(<span class="hljs-string">"this is name f2"</span>)
        
        <span class="hljs-comment">#调用方法和普通函数执行方法一样</span>
        f1()
        f2()</code></pre>
        <p>这样看起来依然很美好，用了完美的语法糖。也没有增加代码的耦合性。但是有个问题，这只是一个简单的装饰器，万一我们需要传入参数呢。万一有些函数需要传入1个参数，而另外一个函数需要传入很多参数，那我们又该怎么办，python中当然有可变参数的传入方式<code>*args</code>,<code>**kwargs</code>。那么我们按照这个思路来修改我们的装饰器</p>
        <pre><code class="language-python"><span class="hljs-keyword">import</span> time
        
        <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">decorator</span><span class="hljs-params">(f)</span>:</span>
            <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">wrapper</span><span class="hljs-params">(*args,**kwargs)</span>:</span>
                <span class="hljs-comment">#print(time.time())</span>
                <span class="hljs-comment">#这里写装饰器需要实现的功能</span>
                f(*args,**kwargs)
            <span class="hljs-keyword">return</span> wrapper
        
        <span class="hljs-meta">@decorator</span>
        <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">f1</span><span class="hljs-params">(fun_name)</span>:</span>
            print(<span class="hljs-string">"this is name "</span>+fun_name)
        <span class="hljs-meta">@decorator</span>
        <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">f2</span><span class="hljs-params">(fun_name1,fun_name2)</span>:</span>
            print(<span class="hljs-string">"this is name "</span>+fun_name1+<span class="hljs-string">" "</span>+fun_name2)
        
        
        f1(<span class="hljs-string">'f1'</span>)
        f2(<span class="hljs-string">'f2'</span>,<span class="hljs-string">'f3'</span>)</code></pre>
        <p>这样我们就实现了多参数的装饰器，任何需要打印时间的函数头上都可以顶一个这样。方便了你我他。同时也体现了Python的优雅。</p>
        <p>人生苦短，我用Python</p>
        <p>多多关注：</p>
        <p>本人的个人博客网站<a href="https://www.immisso.com">https://www.immisso.com</a></p>`,
        anchor: '[]',
        like: 100,
        view: 220,
        comment: 0,
        category_id: 2,
        tag_id: 5,
      },
      {
        title: 'socket模块的使用方法',
        user_id: 2,
        abstract: 'socket（中文名称：套接字）是应用层与传输层(TCP/UDP协议)的接口。是对TCP/IP的封装。是操作系统的通信机制。应用程序通过socket进行网络数据的传输。Python中的socket是我们常用的模块，当然还有socketserver模块（对socket模块的进一步封装）',
        content_html: `<p>socket（中文名称：套接字）是应用层与传输层(TCP/UDP协议)的接口。是对TCP/IP的封装。是操作系统的通信机制。应用程序通过socket进行网络数据的传输。Python中的socket是我们常用的模块，当然还有socketserver模块（对socket模块的进一步封装）</p>
        <p>socket 通信方式，常用的主要是两种</p>
        <ul>
        <li>TCP</li>
        <li>UDP</li>
        </ul>
        <p>下面以一个例子来介绍Socket编程。服务端文件<code>base_socket_server.py</code>,客户端文件<code>base_socket_clent.py</code>。该例子主要介绍了socket的单连接最简单的用法，要深入使用。看后续文章</p>
        <p>在使用socket模块进行编码之前我们先介绍一个socket的参数</p>
        <ul>
        <li><p>family(地址簇)：</p>
        <ol>
        <li>socket.AF_INET IPv4(默认)</li>
        <li>socket.AF_INET6 IPv6</li>
        <li>socket.AF_UNIX用于单一的Unix系统进程间通信</li>
        </ol>
        </li>
        <li><p>type(类型)：</p>
        <ol>
        <li>socket.SOCK_STREAM 流式socket TCP协议（默认）</li>
        <li>socket.SOCK_DGRAM 数据报式socket UDP协议</li>
        <li>socket.SOCK_RAW 原始套接字</li>
        <li>socket.SOCK_RDM 可靠UDP</li>
        <li>socket.SOCK_SEQPACKET 可靠的连接数据包服务</li>
        </ol>
        </li>
        </ul>
        <h3 id="qiyesocket最基本用法">socket最基本用法</h3>
        <p>服务端<code>base_socket_server.py</code></p>
        <pre><code class="language-python"><span class="hljs-comment"># -*- coding: utf-8 -*-</span>
        <span class="hljs-comment"># Created by misso at 2017/8/10</span>
        
        <span class="hljs-comment"># 导入socket模块</span>
        <span class="hljs-keyword">import</span> socket
        
        
        <span class="hljs-comment"># 创建实例</span>
        <span class="hljs-comment"># 默认AF_INET,SOCK_STREAM可以不填写</span>
        sk = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
        
        <span class="hljs-comment"># 定义绑定的ip和port</span>
        ip_port = (<span class="hljs-string">"127.0.0.1"</span>,<span class="hljs-number">8000</span>)
        
        <span class="hljs-comment">#绑定监听</span>
        sk.bind(ip_port)
        
        <span class="hljs-comment"># 监听</span>
        sk.listen()
        
        print(<span class="hljs-string">"等待接受数据.........."</span>)
        <span class="hljs-comment"># 接受数据</span>
        sock,addr = sk.accept()
        
        <span class="hljs-comment"># 获取从客户端发过来的数据</span>
        <span class="hljs-comment"># 一次获取1k的数据</span>
        <span class="hljs-comment"># python3.x以上的版本。网络数据的发送接受都是byte类型。</span>
        <span class="hljs-comment"># 如果发送的数据是str类型则需要进行编解码</span>
        data = sock.recv(<span class="hljs-number">1024</span>)
        str_data = data.decode(<span class="hljs-string">"utf8"</span>)
        print(str_data)
        
        <span class="hljs-comment"># 给客户端返回数据</span>
        msg = <span class="hljs-string">"服务端返回的数据："</span>+str_data
        sock.send(msg.encode())
        
        <span class="hljs-comment"># 主动关闭连接</span>
        sock.close()</code></pre>
        <p>这段代码的意思是开启一个socket服务，客户端发送过来消息后。经过服务端的处理后。再返回给客户端，然后断开连接。接下来看客户端的代码。</p>
        <p>客户端<code>base_socket_client.py</code></p>
        <pre><code class="language-python">
        <span class="hljs-comment"># -*- coding: utf-8 -*-</span>
        <span class="hljs-comment"># Created by misso at 2017/8/10</span>
        
        <span class="hljs-keyword">import</span> socket
        
        
        <span class="hljs-comment"># 创建实例</span>
        <span class="hljs-comment"># 默认AF_INET,SOCK_STREAM可以不填写</span>
        client = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
        
        <span class="hljs-comment"># 定义绑定的ip和port</span>
        ip_port = (<span class="hljs-string">"127.0.0.1"</span>,<span class="hljs-number">8000</span>)
        
        <span class="hljs-comment">#绑定监听</span>
        client.connect(ip_port)
        
        <span class="hljs-comment"># 给服务器发送数据</span>
        
        str = input(<span class="hljs-string">"输入数据："</span>)
        
        client.send(str.encode(<span class="hljs-string">"utf8"</span>))
        
        data = client.recv(<span class="hljs-number">1024</span>)
        print(data.decode())
        client.close()
        </code></pre>
        <p>客户端的代码的意思是，开启连接，连接到指定端口，用户输入数据发送到服务端，然后接受服务端返回的数据。最后再关闭这个连接</p>
        <p>运行结果如下：<br><img src="https://immisso.oss-cn-hangzhou.aliyuncs.com/article/1021310/001.webp" alt=""><br><img src="https://immisso.oss-cn-hangzhou.aliyuncs.com/article/1021310/002.webp" alt=""></p>
        <h3 id="qiye客服端连续消息发送">客服端连续消息发送</h3>
        <p>上面两个文件最后都关闭了连接，我们怎么保持消息的连续发送呢？仅仅是不做关闭就可以了吗？即使我们注释掉<code>base_socket_server.py</code>文件里的st.close()。就会发现依旧是不可以的。我们怎么实现一次连接，就可以持续发送呢，我们可以在一次连接成功后做一个while true的循环，这样我们就可以持续发送消息了。下面是对代码的进一步改写。</p>
        <p>服务端<code>base_socket_server.py</code>改写后的代码</p>
        <pre><code class="language-python">
        <span class="hljs-comment"># -*- coding: utf-8 -*-</span>
        <span class="hljs-comment"># Created by misso at 2017/8/12</span>
        
        <span class="hljs-comment"># 导入socket模块</span>
        <span class="hljs-keyword">import</span> socket
        
        <span class="hljs-comment"># 创建实例</span>
        <span class="hljs-comment"># 默认AF_INET,SOCK_STREAM可以不填写</span>
        sk = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        
        <span class="hljs-comment"># 定义绑定的ip和port</span>
        ip_port = (<span class="hljs-string">"127.0.0.1"</span>, <span class="hljs-number">8000</span>)
        
        <span class="hljs-comment"># 绑定监听</span>
        sk.bind(ip_port)
        
        <span class="hljs-comment"># 监听</span>
        sk.listen()
        
        <span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
            print(<span class="hljs-string">"等待接受数据.........."</span>)
            <span class="hljs-comment"># 接受数据</span>
            sock, addr = sk.accept()
            message = <span class="hljs-string">"连接成功"</span>
            sock.send(message.encode(<span class="hljs-string">"utf8"</span>))
        
            <span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
                <span class="hljs-comment"># 获取从客户端发过来的数据</span>
                <span class="hljs-comment"># 一次获取1k的数据</span>
                <span class="hljs-comment"># python3.x以上的版本。网络数据的发送接受都是byte类型。</span>
                <span class="hljs-comment"># 如果发送的数据是str类型则需要进行编解码</span>
                data = sock.recv(<span class="hljs-number">1024</span>)
                str_data = data.decode(<span class="hljs-string">"utf8"</span>)
                print(str_data)
        
                <span class="hljs-keyword">if</span> str_data == <span class="hljs-string">"exit"</span>:
                    <span class="hljs-keyword">break</span>
        
                <span class="hljs-comment"># 给客户端返回数据</span>
                msg = <span class="hljs-string">"服务端返回的数据："</span> + str_data
                sock.send(msg.encode(<span class="hljs-string">"utf8"</span>))
        
            <span class="hljs-comment"># 主动关闭连接</span>
            sock.close()</code></pre>
        <p>客户端<code>base_socket_client.py</code>改写后的代码</p>
        <pre><code class="language-python">
        <span class="hljs-comment"># -*- coding: utf-8 -*-</span>
        <span class="hljs-comment"># Created by misso at 2017/8/12</span>
        
        <span class="hljs-keyword">import</span> socket
        
        <span class="hljs-comment"># 创建实例</span>
        <span class="hljs-comment"># 默认AF_INET,SOCK_STREAM可以不填写</span>
        client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        
        <span class="hljs-comment"># 定义绑定的ip和port</span>
        ip_port = (<span class="hljs-string">"127.0.0.1"</span>, <span class="hljs-number">8000</span>)
        
        <span class="hljs-comment"># 绑定监听</span>
        client.connect(ip_port)
        
        <span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
            <span class="hljs-comment"># 接受消息</span>
            data = client.recv(<span class="hljs-number">1024</span>)
            print(data.decode(<span class="hljs-string">"utf8"</span>))
            <span class="hljs-comment"># 给服务器发送数据</span>
            input_str = input(<span class="hljs-string">"输入数据："</span>)
        
            client.send(input_str.encode(<span class="hljs-string">"utf8"</span>))
        
            <span class="hljs-keyword">if</span> input_str == <span class="hljs-string">"exit"</span>:
                <span class="hljs-keyword">break</span></code></pre>
        <p>运行结果如下：<br><img src="https://immisso.oss-cn-hangzhou.aliyuncs.com/article/1021310/003.webp" alt=""><br><img src="https://immisso.oss-cn-hangzhou.aliyuncs.com/article/1021310/004.webp" alt=""></p>
        <p>这样便实现了一个用户连续发送信息连接不断开的要求，即使这样当一个用户连接的时候，另一个用户是不能连接的。我们怎样才能进行多连接呢？这里我们就会用到多线程了，每一个用户连接开启一个线程。就能保证多用户同时连接了。</p>
        <h3 id="qiye多用户连接">多用户连接</h3>
        <p>上面也提到了，在实际应用中，我们需要多个用户连接的，我们可以通过开启线程的方式进行多用户连接</p>
        <p>服务端<code>middle_socket_server.py</code></p>
        <pre><code class="language-python">
        <span class="hljs-comment"># -*- coding: utf-8 -*-</span>
        <span class="hljs-comment"># Created by misso at 2017/8/12</span>
        
        <span class="hljs-comment"># 导入socket、threading模块</span>
        <span class="hljs-keyword">import</span> socket
        <span class="hljs-keyword">import</span> threading
        
        <span class="hljs-comment"># 创建实例</span>
        <span class="hljs-comment"># 默认AF_INET,SOCK_STREAM可以不填写</span>
        sk = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        
        <span class="hljs-comment"># 定义绑定的ip和port</span>
        ip_port = (<span class="hljs-string">"127.0.0.1"</span>, <span class="hljs-number">8000</span>)
        
        <span class="hljs-comment"># 绑定监听</span>
        sk.bind(ip_port)
        
        <span class="hljs-comment"># 监听</span>
        sk.listen()
        
        <span class="hljs-comment"># 定义线程执行函数</span>
        
        <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">handle_sock</span><span class="hljs-params">(sock,addr)</span>:</span>
            message = <span class="hljs-string">"连接成功"</span>
            sock.send(message.encode(<span class="hljs-string">"utf8"</span>))
            <span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
                <span class="hljs-comment"># 获取从客户端发过来的数据</span>
                <span class="hljs-comment"># 一次获取1k的数据</span>
                <span class="hljs-comment"># python3.x以上的版本。网络数据的发送接受都是byte类型。</span>
                <span class="hljs-comment"># 如果发送的数据是str类型则需要进行编解码</span>
                data = sock.recv(<span class="hljs-number">1024</span>)
                str_data = data.decode(<span class="hljs-string">"utf8"</span>)
                print(str_data)
        
                <span class="hljs-keyword">if</span> str_data == <span class="hljs-string">"exit"</span>:
                    <span class="hljs-keyword">break</span>
        
                <span class="hljs-comment"># 给客户端返回数据</span>
                msg = <span class="hljs-string">"服务端返回的数据："</span> + str_data
                sock.send(msg.encode(<span class="hljs-string">"utf8"</span>))
            <span class="hljs-comment"># 主动关闭连接</span>
            sock.close()
        <span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
            print(<span class="hljs-string">"等待接受数据.........."</span>)
            <span class="hljs-comment"># 接受数据</span>
            sock, addr = sk.accept()
            client_thread = threading.Thread(target=handle_sock,args=(sock,addr))
            client_thread.start()
        </code></pre>
        <p>客户端<code>middle_socket_client.py</code></p>
        <pre><code class="language-python">
        <span class="hljs-comment"># -*- coding: utf-8 -*-</span>
        <span class="hljs-comment"># Created by misso at 2017/8/12</span>
        
        <span class="hljs-keyword">import</span> socket
        
        <span class="hljs-comment"># 创建实例</span>
        <span class="hljs-comment"># 默认AF_INET,SOCK_STREAM可以不填写</span>
        client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        
        <span class="hljs-comment"># 定义绑定的ip和port</span>
        ip_port = (<span class="hljs-string">"127.0.0.1"</span>, <span class="hljs-number">8000</span>)
        
        <span class="hljs-comment"># 绑定监听</span>
        client.connect(ip_port)
        
        <span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
            <span class="hljs-comment"># 接受消息</span>
            data = client.recv(<span class="hljs-number">1024</span>)
            print(data.decode(<span class="hljs-string">"utf8"</span>))
            <span class="hljs-comment"># 给服务器发送数据</span>
            input_str = input(<span class="hljs-string">"输入数据："</span>)
        
            client.send(input_str.encode(<span class="hljs-string">"utf8"</span>))
        
            <span class="hljs-keyword">if</span> input_str == <span class="hljs-string">"exit"</span>:
                <span class="hljs-keyword">break</span>
        </code></pre>
        <p>运行结果如下：<br><img src="https://immisso.oss-cn-hangzhou.aliyuncs.com/article/1021310/005.webp" alt=""><br><img src="https://immisso.oss-cn-hangzhou.aliyuncs.com/article/1021310/006.webp" alt=""><br><img src="https://immisso.oss-cn-hangzhou.aliyuncs.com/article/1021310/007.webp" alt=""></p>
        <p>提到多连接我们不得不提另一个模块socketserver。</p>
        <h3 id="qiyesocketserver模块的使用">socketserver模块的使用</h3>
        <p>socketserver模块是对socket的封装。它也可以进行用户的多连接（其内部实现源码也使用了threading模块）。使用起来更加方便。<br>服务端<code>socketserver_socket_server.py</code></p>
        <pre><code class="language-python">
        <span class="hljs-comment"># -*- coding: utf-8 -*-</span>
        <span class="hljs-comment"># Created by misso at 2017/8/12</span>
        
        
        <span class="hljs-comment"># 导入模块</span>
        <span class="hljs-keyword">from</span> socketserver <span class="hljs-keyword">import</span> BaseRequestHandler,ThreadingTCPServer
        
        
        <span class="hljs-comment"># 定义类</span>
        <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyServer</span><span class="hljs-params">(BaseRequestHandler)</span>:</span>
            <span class="hljs-comment"># 重写handle方法</span>
            <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">handle</span><span class="hljs-params">(self)</span>:</span>
                <span class="hljs-comment"># 定义连接对象</span>
                conn = self.request
        
                message = <span class="hljs-string">"连接成功"</span>
                conn.send(message.encode())
        
        
                <span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
                    <span class="hljs-comment"># 接受客户端消息</span>
                    data = conn.recv(<span class="hljs-number">1024</span>)
                    <span class="hljs-comment"># 打印接受的消息</span>
                    print(data.decode(<span class="hljs-string">"utf8"</span>))
        
                    <span class="hljs-comment">#如果接受到exit的消息，则进行循环的退出</span>
        
                    <span class="hljs-keyword">if</span> data == <span class="hljs-string">b'exit'</span>:
                        <span class="hljs-keyword">break</span>
        
                    conn.send(data)
                conn.close()
        <span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">"__main__"</span>:
        
            <span class="hljs-comment"># 创建多线程实例</span>
        
            server = ThreadingTCPServer((<span class="hljs-string">"127.0.0.1"</span>,<span class="hljs-number">8000</span>),MyServer)
        
            <span class="hljs-comment"># 开启socketserver异步多线程</span>
        
            server.serve_forever()
        </code></pre>
        <p>客户端<code>base_socket_client.py</code></p>
        <pre><code class="language-python">
        <span class="hljs-comment"># -*- coding: utf-8 -*-</span>
        <span class="hljs-comment"># Created by misso at 2017/8/12</span>
        
        <span class="hljs-keyword">import</span> socket
        
        <span class="hljs-comment"># 创建实例</span>
        <span class="hljs-comment"># 默认AF_INET,SOCK_STREAM可以不填写</span>
        client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        
        <span class="hljs-comment"># 定义绑定的ip和port</span>
        ip_port = (<span class="hljs-string">"127.0.0.1"</span>, <span class="hljs-number">8000</span>)
        
        <span class="hljs-comment"># 绑定监听</span>
        client.connect(ip_port)
        
        <span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
            <span class="hljs-comment"># 接受消息</span>
            data = client.recv(<span class="hljs-number">1024</span>)
            print(data.decode(<span class="hljs-string">"utf8"</span>))
            <span class="hljs-comment"># 给服务器发送数据</span>
            input_str = input(<span class="hljs-string">"输入数据："</span>)
        
            client.send(input_str.encode(<span class="hljs-string">"utf8"</span>))
        
            <span class="hljs-keyword">if</span> input_str == <span class="hljs-string">"exit"</span>:
                <span class="hljs-keyword">break</span>
        </code></pre>
        <p>运行结果如下：</p>
        <p><img src="https://immisso.oss-cn-hangzhou.aliyuncs.com/article/1021310/008.webp" alt=""><br><img src="https://immisso.oss-cn-hangzhou.aliyuncs.com/article/1021310/009.webp" alt=""><br><img src="https://immisso.oss-cn-hangzhou.aliyuncs.com/article/1021310/010.webp" alt=""></p>`,
        anchor: '[{"tag":"h3","level":3,"href":"qiyesocket最基本用法","title":"socket最基本用法","ismain":true},{"tag":"h3","level":3,"href":"qiye客服端连续消息发送","title":"客服端连续消息发送","ismain":true},{"tag":"h3","level":3,"href":"qiye多用户连接","title":"多用户连接","ismain":true},{"tag":"h3","level":3,"href":"qiyesocketserver模块的使用","title":"socketserver模块的使用","ismain":true}]',
        like: 100,
        view: 220,
        comment: 0,
        category_id: 2,
        tag_id: 5,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('articles', null, {});
  },
};
