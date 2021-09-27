# nodeTrain

## 동기와 비동기, 블로킹과 논 블로킹

동기와 비동기, 블로킹과 논 블로킹이라는 네 개의 용어가 노드에서 혼용되고 있으며, 의미도 서로 다릅니다.

- 동기와 비동기: 백그라운드 작업 완료 확인 여부
- 블로킹과 논 블로킹: 함수가 바로 return되는지 여부

노드에서는 동기-블로킹 방식과 비동기-논 블로킹 방식이 대부분입니다.

동기-논 블로킹이나 비동기-블로킹은 없다고 봐도 됩니다.

동기-블로킹 방식에서는 백그라운드 작업 완료 여부를 계속 확인하며, 호출한 함수가 바로 return되지 않고 백그라운드 작업이 끝나야 return됩니다. 비동기-논 블로킹 방식에서는 호출한 함수가 바로 return되어 다음 작업으로 넘어가며, 백그라운드 작업완료 여부는 신경 쓰지 않고 나중에 백그라운드가 알림을 줄 때 비로소 처리합니다.

## 버퍼와 스트림

버퍼링은 영상을 재생할 수 있을 때까지 데이터를 모으는 동작이고, 스트리밍은 방송인의 컴퓨터에서 시청자의 컴퓨터로 영상 데이터를 조금씩 전송하는 동작입니다.

노드는 파일을 읽을 때 메모리에 파일 크기만큼 공간을 마련해두며 파일 데이터를 메모리에 저장한 뒤 사용자가 조작할 수 있도록 합니다. 이때 메모리에 저장된 데이터가 바로 버퍼입니다.

## 유명한 포트번호

- 21: FTP
- 80: HTTP
- 443: HTTPS
- 3306: MYSQL

리눅스에서는 1024번 이하의 포트에 연결할 때 관리자 권한이 필요하므로 sudo를 붙여야한다.