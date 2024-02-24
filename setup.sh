echo "Setup start" && \
echo "Install global repo packages" && \
npm i && \
cd Client && \
npm i && \
cd ../ && \
echo "Install client packages" && \
cd Common && \
npm i && \
cd ../ && \
echo "Install SportsDataFetcher packages" && \
cd SportsDataFetcher && \
npm i && \
cd ../ && \
echo "Install server packages" && \
cd Server && \
npm i && \
cd ../ && \
echo "Update certificates (if any exist)" && \
chmod -f 400 Server/certificates/node-express-ec2.pem || true && \
cd ../ && \
echo "Setup complete"
