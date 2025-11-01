

---

**Vulnerability:** Improper Neutralization of Special Elements used in an SQL Command ('SQL Injection')
**Severity:** Medium
**Location:** `cms/src/dataProvider.js`
**Line Content:** `query = query.ilike(key, `%${params.filter[key]}%`);`
**Description:** The `key` variable, derived from user-controlled input `params.filter`, is used directly as a column name in a database query. While the value is parameterized by the Supabase client, the column name itself is not validated. This could allow an attacker to probe for valid column names by sending crafted filter requests and observing error messages, leading to an information leak about the database schema.
**Recommendation:** Implement a whitelist validation for the `key` variable. Before using it in a query, ensure that the `key` is one of the expected and valid column names for the given resource. This prevents attackers from injecting arbitrary strings into the column identifier portion of the query.
