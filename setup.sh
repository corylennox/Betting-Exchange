npm i && \
cd Client && \
npm i && \
cd ../ && \
cd Common && \
npm i && \
cd ../ && \
cd Server && \
npm i && \
cd ../ && \
cd Common && \
npm link && \
cd ../ && \
cd Client && \
npm link ../Common && \
cd ../ && \
cd Server && \
npm link ../Common

