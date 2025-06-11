const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '..', 'app');
const exampleDir = path.join(__dirname, '..', 'app-example');

if (fs.existsSync(exampleDir)) {
  console.error('app-example already exists. Aborting to avoid overwriting.');
  process.exit(1);
}

if (!fs.existsSync(appDir)) {
  console.error('app directory not found.');
  process.exit(1);
}

fs.renameSync(appDir, exampleDir);
fs.mkdirSync(appDir);

// minimal blank screen
const layout = `import { Stack } from 'expo-router';
export default function Layout() {
  return <Stack />;
}
`;
fs.writeFileSync(path.join(appDir, '_layout.tsx'), layout);

const index = `import { View, Text } from 'react-native';
export default function Index() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Hello World</Text>
    </View>
  );
}
`;
fs.writeFileSync(path.join(appDir, 'index.tsx'), index);

console.log('Project reset complete. Starter code moved to app-example.');

