<img width="1536" height="1024" alt="Task Yönetimi - React Hook Form Geçişi" src="https://github.com/user-attachments/assets/aa476521-f257-406b-9d9a-6dddb0c26c5a" />
# Task Yönetim Uygulaması

Bu proje React kullanılarak geliştirilmiş  Kullanıcılar yeni kişiler ekleyebilir, görev oluşturabilir ve görevleri tamamlandı olarak işaretleyebilir.

## Özellikler

- Yeni kişi ekleme
- Yeni görev oluşturma
- Görevleri kişilere atama
- Yapılacak görevleri listeleme
- Görevleri tamamlandı olarak işaretleme
- Bildirimler için Toastify kullanımı

## Kullanılan Teknolojiler

- React
- React Hook Form
- React Toastify
- JavaScript
- CSS

## Form Doğrulamaları

- Başlık alanı en az 3 karakter olmalıdır.
- Açıklama alanı en az 3 karakter olmalıdır.
- Görev en az 1 kişiye atanmalıdır.

Hatalı girişlerde kullanıcıya uygun hata mesajları gösterilir.

## Bildirimler

Toastify kullanılarak aşağıdaki bildirimler gösterilir:

- Yeni kişi eklendiğinde: **"Yeni kişi oluşturuldu."**
- Yeni görev eklendiğinde: **"Yeni görev oluşturuldu."**
- Görev tamamlandığında: **"2 idli görev tamamlandı."**

## Kurulum

Projeyi çalıştırmak için:

```bash
npm install
npm start
