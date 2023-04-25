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
cd Server/certificates && \
chmod -f 400 node-express-ec2.pem && \
cd ../ && \
rm -f bettingexchangecommon && \
ln -s ../Common bettingexchangecommon && \
cd ../ && \
echo "Setup complete"
