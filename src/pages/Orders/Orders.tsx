import { AdminLayout } from '../../layouts';
import { Dropdown } from '../../components';

const ordersSort = [
  { value: 'status', label: 'статусу' }, // Статусы заказов
  { value: 'client', label: "QR-коду клиента" }, // QR-code клиента
  { value: 'shtrih', label: "штрих-коду" }, // Штрих-код товара, показывает заказ где этот товар лежит
  { value: 'phone', label: 'номеру телефона' }, // Поиск заказов по номеру телефона
];

function OrdersPage() {
  return (
    <AdminLayout title="Список заказов">
      <Dropdown
        options={ordersSort}
        onSelect={(value) => console.log(value)}
        placeholder='Выберите что нибудь'
        title="Заказы по:"
        defaultValue={ordersSort[0]}
      />
    </AdminLayout>
  );
}

export default OrdersPage;
