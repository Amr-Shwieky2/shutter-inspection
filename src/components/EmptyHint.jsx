import { EmptyIcon } from '../icons';

export default function EmptyHint() {
  return (
    <div className="empty-hint">
      <EmptyIcon />
      <b>עדיין לא נשמרו קומות</b>
      <span>מלאו את פרטי הקומה למעלה, בחרו סטטוס לכל חלון ולחצו על &quot;שמירת קומה&quot;</span>
    </div>
  );
}
