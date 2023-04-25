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
chmod -f 400 Server/certificates/node-express-ec2.pem && \
cd Server && \
rm -f bettingexchangecommon && \
ln -s ../Common bettingexchangecommon && \
cd ../ && \
echo "Setup complete"
