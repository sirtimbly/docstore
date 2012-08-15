//this server is intended for directly linking to files in the format of: host/?filename
var homepage = 'http://timbendt.com' //so this is where we redirect when the user came without a file path

$.domReady(function() {
  var page = document.location.search.substring(1)
  if (page[page.length - 1] == '/') page = page.substring(0, page.length - 1)
  if (!page) {
    window.location = homepage
    return
  }

  var url = 'text/' + page + '.md'
  $.ajax({
    url: url,
    type:'html',
    success: function(resp) {
      if (!resp) {
        window.location = homepage
      }

      document.getElementById('content').innerHTML = markdown.toHTML(resp)
      $('pre').each(function(el, index) {
        hljs.highlightBlock(el, '  ')
      })
    }})

  document.title = page;
  document.getElementById('viewsource').setAttribute('href', 
    'http://docs.timbendt.com/' + url)
  
  MathJax.Hub.Config({
  tex2jax: {
    inlineMath: [['$','$'], ['\\(','\\)']],
    processEscapes: true
  }
});
})
