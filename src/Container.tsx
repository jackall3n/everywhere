import "./container.css";

console.log();

export function setCookie(name: string, val: string) {
  const date = new Date();
  const value = val;

  // Set it to expire in 7 days
  date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);

  // Set it
  document.cookie =
    name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
}

function initialise() {
  const processed = [];

  const url = new URL(window.location.href);
  const params = Array.from(url.searchParams.entries());

  try {
    for (const [key, value] of params) {
      const [prefix, type, name] = key.split(":");

      if (key === "__everywhere") {
        const parsed = JSON.parse(atob(value));

        for (const [name, config] of Object.entries(
          parsed.cookies ?? {}
        ) as any) {
          console.log(name, config);

          setCookie(name, config.value);
        }

        processed.push(key);

        continue;
      }

      if (prefix !== "__everywhere") {
        continue;
      }

      if (type === "cookie") {
        setCookie(name, value);

        processed.push(key);
      }
    }
  } catch (e) {
    console.error(e);
  }

  if (processed.length) {
    processed.forEach((param) => url.searchParams.delete(param));

    console.log(processed, url.searchParams.toString());

    window.location.search = url.searchParams.toString();

    console.log(params);
  }
}

initialise();

function group(name: string, members: string) {
  return {
    name,
    members: members
      .trim()
      .split("\n")
      .map((m) => {
        const [id, postcode] = m.split("\t").map((t) => t.trim());
        return member(id, postcode);
      }),
  };
}

function member(id: string, postcode: string) {
  return {
    id,
    postcode,
  };
}

const group1 = `
4145617314\tBN11 2BA
1040388612\tBN11 2BA
239424675\tSE13 7FH
2019260471\tBN13 2UA
633174027\tSE12 0TQ
485636383\tSE12 0TQ
`;

const group2 = `
684207947\tBN12 4EF
709762502\tBN12 4EF
2440000882\tBN15 8BG
1699879142\tBN11 5SL
2330339566\tSE23 2EE
`;

const groups = [group("Group 1", group1), group("Group 2", group2)];

function set(index: number, id: string, postcode: string) {
  const _id = document.getElementById(
    `registrations_${index}__RegistrationId`
  ) as HTMLInputElement;
  const _postCode = document.getElementById(
    `registrations_${index}__PostCode`
  ) as HTMLInputElement;

  if (_id) {
    _id.value = id;
  }
  if (_postCode) {
    _postCode.value = postcode;
  }
}

function Container() {
  function addGroup(g: ReturnType<typeof group>) {
    console.log({ g });

    set(0, "", "");
    set(1, "", "");
    set(2, "", "");
    set(3, "", "");
    set(4, "", "");
    set(5, "", "");

    g.members.forEach((member, index) =>
      set(index, member.id, member.postcode)
    );
  }

  if (!window.location.pathname.includes("event")) {
    return null;
  }

  return (
    <div className="everywhere">
      <div className="groups">
        {groups.map((group) => (
          <button
            key={group.name}
            className="group"
            onClick={() => addGroup(group)}
          >
            <div>
              <strong>{group.name}</strong>
            </div>

            <div className="members">
              {group.members.map((member) => (
                <div key={member.id} className="member">
                  <div>{member.id}</div>
                  <div>{member.postcode}</div>
                </div>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Container;
