import { requireAdmin } from "@/lib/admin/auth";
import { getSettings } from "@/lib/settings";
import { saveSettings } from "@/lib/admin/actions";
import ActionForm from "@/components/admin/ActionForm";
import styles from "@/components/admin/Admin.module.css";

export default async function HomepageAdmin() {
  await requireAdmin(); // auth check per page: layouts alone are not a security boundary
  const s = getSettings();
  return <div>
    <div className={styles.titleRow}><h1 className={styles.h1}>Homepage</h1><a className={styles.secondary} href="/" target="_blank" rel="noreferrer">View homepage ↗</a></div>
    <ActionForm action={saveSettings}>
      <fieldset className={styles.box}>
        <legend>Hero (top of homepage)</legend>
        <label className={styles.field}><span>Small badge text</span><input name="heroPill" defaultValue={s.heroPill} /></label>
        <label className={styles.field}><span>Main heading — wrap a word in *stars* to colour it</span><input name="heroTitle" defaultValue={s.heroTitle} /></label>
        <label className={styles.field}><span>Intro text</span><textarea name="heroLead" rows={3} defaultValue={s.heroLead} /></label>
        <label className={styles.field}><span>Button text</span><input name="heroButton" defaultValue={s.heroButton} /></label>
      </fieldset>
      <fieldset className={styles.box}>
        <legend>&quot;Why JustSupplies&quot; section</legend>
        <label className={styles.field}><span>Heading</span><input name="storyTitle" defaultValue={s.storyTitle} /></label>
        <label className={styles.field}><span>Text</span><textarea name="storyText" rows={4} defaultValue={s.storyText} /></label>
      </fieldset>
    </ActionForm>
  </div>;
}
