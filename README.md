# Hugo Slides

[![Build Status](https://travis-ci.org/brettinternet/hugo-slides.svg?branch=master)](https://travis-ci.org/brettinternet/hugo-slides)

A simple directory for your Reveal.js markdown slides.

<!-- Add print
{{ $reveal_location := "reveal-js" }}
<a href="{{ printf "%s/css/print/" $reveal_location | relURL }}" id="print-location" style="display: none;"></a>
<script type="text/javascript">
  var printLocationElement = document.getElementById('print-location');
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = printLocationElement.href + (window.location.search.match(/print-pdf/gi) ? 'pdf.css' : 'paper.css');
  document.getElementsByTagName('head')[0].appendChild(link);
</script> -->
