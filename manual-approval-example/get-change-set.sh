cd cdk-project
npm install -g
cdk --version
if cdk diff CdkProjectStack --fail; then
  echo no-change > ${ATTINI_OUTPUT}
else
  echo change-detected > ${ATTINI_OUTPUT}
fi
cd ..
