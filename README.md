# Etkinlik Değerlendirme Platformu
Bu proje Ömer Mert ERYİĞİT tarafından Akdeniz Üniversitesi Elektrik Elektronik Mühendisliği bölümü İleri Bilgisayar Programlama dersi final projesi olarak geliştirilmiştir.

Platform kullanıcıların etkinlik alanı içerisinde bulunan QR kodları okutarak/sağlanan bağlantıyı kullanarak seçili etkinliklerden ya da etkinlik düzenleyicisi tarafından önceden seçilmiş bir etkinlik için değerlendirme yapmalarına imkan verir.

## Etkinlik Değerlendirme - Listelenmiş Hlade
![screencapture-localhost-8081-2024-01-14-03_45_43](https://github.com/oomerty/ibp-proje/assets/59279876/b24a0feb-1ec4-4c4e-8545-f277a1c7c0a1)
![screencapture-localhost-8081-2024-01-14-03_46_21](https://github.com/oomerty/ibp-proje/assets/59279876/6624a014-5cf9-4eff-a10a-e43a5dc693c4)

## Etkinlik Değerlendirme - Seçili Etkinlik
Etkinlik düzenleyicisi sadece tek bir etkinliğin değerlendirilmesini isterse özel bağlantıya özel QR kod oluşturarak etkinlik listelenmesi aşamasını kaldırabilir.
> localhost:8081/event?eventID={etkinlik-id}

![screencapture-localhost-8081-event-2024-01-14-03_50_59](https://github.com/oomerty/ibp-proje/assets/59279876/927fd954-8727-40e1-9c10-cb7bd1898a5d)


## Admin Paneli
Admin paneli üzerinden etkinlikler ve değerlendirmeler tablo halind görüntülenebilir.
> localhost:8081/admin

![screencapture-localhost-8081-admin-2024-01-14-03_46_37](https://github.com/oomerty/ibp-proje/assets/59279876/869d4a33-d21c-4d9a-9e83-8c8211033d04)
![screencapture-localhost-8081-admin-2024-01-14-03_52_10](https://github.com/oomerty/ibp-proje/assets/59279876/003b008d-736f-4281-be13-21ebd0eadd9f)

## Temalar
Uygulama 3 tane temaya sahiptir: Açık, Karanlık ve Nintendo'nun ünlü oyun serisinden esinlenen Animal Crossing temaları.
![Frame 5](https://github.com/oomerty/ibp-proje/assets/59279876/a7cc801d-9c72-4aca-90ed-485e98078c11)






