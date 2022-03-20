FROM rocker/tidyverse
RUN Rscript -e 'install.packages("pagedown")'
RUN Rscript -e 'remotes::install_github("mitchelloharawild/icons@v0.1.0")'

RUN apt update -qq && apt-get install -y -qq --no-install-recommends libz-dev libpoppler-cpp-dev pandoc curl
RUN curl -L https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -o chrome.deb && apt-get -y install ./chrome.deb && rm chrome.deb
COPY google-chrome /usr/local/bin/

COPY datadrivencv /datadrivencv
RUN R CMD build datadrivencv    
RUN R CMD INSTALL datadrivencv
