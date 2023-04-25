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
echo "Install server packages" && \
cd Server && \
npm i && \
cd ../ && \
echo "Create npm link for common directory" && \
cd Common && \
npm link && \
cd ../ && \
cd Client && \
npm link ../Common && \
cd ../ && \
echo "Update certificates (if any exist)" && \
chmod -f 400 Server/certificates/node-express-ec2.pem || true && \
echo "Symlink bettingexchangecommon" && \
cd Server && \
rm -f bettingexchangecommon && \
ln -s ../Common bettingexchangecommon && \
cd ../ && \
echo "Setup complete"
