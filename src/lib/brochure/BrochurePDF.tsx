import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { Property } from "@/data/properties";

// Register built-in fonts (no external dependency)
Font.register({
  family: "Helvetica",
  fonts: [
    { src: "Helvetica" },
    { src: "Helvetica-Bold", fontWeight: "bold" },
    { src: "Helvetica-Oblique", fontStyle: "italic" },
  ],
});

// ── Brand tokens ───────────────────────────────────────────────────────────
const GOLD = "#C9A96E";
const MIDNIGHT = "#1A1A2E";
const CREAM = "#F8F6F1";
const DARK_GRAY = "#4A4A5A";
const LIGHT_BORDER = "#E8E4DA";

const PAGE_WIDTH = 612;
const PAGE_HEIGHT = 792;

const styles = StyleSheet.create({
  // Shared
  page: {
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
  },
  goldBar: {
    height: 3,
    backgroundColor: GOLD,
    width: "100%",
  },

  // ── Page 1: Hero ──────────────────────────────────────────────────────────
  heroPage: {
    position: "relative",
    backgroundColor: MIDNIGHT,
  },
  heroImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 0.55,
  },
  heroOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "65%",
    // gradient simulation with solid dark
    backgroundColor: MIDNIGHT,
    opacity: 0.7,
  },
  heroContent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 40,
  },
  heroLogo: {
    fontSize: 22,
    fontFamily: "Helvetica",
    fontWeight: "bold",
    color: GOLD,
    letterSpacing: 3,
  },
  heroLogoSub: {
    fontSize: 8,
    color: "#FFFFFF",
    letterSpacing: 4,
    marginTop: 2,
    opacity: 0.85,
  },
  heroBottom: {
    gap: 10,
  },
  heroStatus: {
    fontSize: 9,
    color: GOLD,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  heroAddress: {
    fontSize: 30,
    fontFamily: "Helvetica",
    fontWeight: "bold",
    color: "#FFFFFF",
    lineHeight: 1.2,
    marginBottom: 4,
  },
  heroCity: {
    fontSize: 14,
    color: "#E0E0E0",
    marginBottom: 20,
  },
  heroPrice: {
    fontSize: 28,
    fontFamily: "Helvetica",
    fontWeight: "bold",
    color: GOLD,
    marginBottom: 16,
  },
  heroStats: {
    flexDirection: "row",
    gap: 0,
  },
  heroStat: {
    marginRight: 28,
  },
  heroStatValue: {
    fontSize: 16,
    fontFamily: "Helvetica",
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  heroStatLabel: {
    fontSize: 8,
    color: "#BBBBBB",
    letterSpacing: 1,
    marginTop: 2,
  },

  // ── Page 2: Details ───────────────────────────────────────────────────────
  detailsPage: {
    padding: 40,
    paddingTop: 36,
  },
  pageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_BORDER,
  },
  pageHeaderTitle: {
    fontSize: 18,
    fontFamily: "Helvetica",
    fontWeight: "bold",
    color: MIDNIGHT,
  },
  pageHeaderAddress: {
    fontSize: 9,
    color: DARK_GRAY,
  },
  logoSmall: {
    fontSize: 11,
    fontFamily: "Helvetica",
    fontWeight: "bold",
    color: GOLD,
    letterSpacing: 2,
  },
  photoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 20,
  },
  photoGridMain: {
    width: "100%",
    height: 180,
    objectFit: "cover",
    borderRadius: 4,
    marginBottom: 6,
  },
  photoGridThumb: {
    width: (PAGE_WIDTH - 80 - 18) / 4,
    height: 80,
    objectFit: "cover",
    borderRadius: 3,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica",
    fontWeight: "bold",
    color: MIDNIGHT,
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  descriptionText: {
    fontSize: 9.5,
    color: DARK_GRAY,
    lineHeight: 1.55,
    marginBottom: 18,
  },
  featuresGrid: {
    flexDirection: "row",
    gap: 12,
    marginTop: 4,
  },
  featuresCol: {
    flex: 1,
  },
  featureCatTitle: {
    fontSize: 8,
    fontFamily: "Helvetica",
    fontWeight: "bold",
    color: GOLD,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 4,
    gap: 5,
  },
  featureBullet: {
    fontSize: 8,
    color: GOLD,
    marginTop: 1,
  },
  featureText: {
    fontSize: 8.5,
    color: DARK_GRAY,
    flex: 1,
  },

  // ── Page 3: Location ──────────────────────────────────────────────────────
  locationPage: {
    padding: 40,
    paddingTop: 36,
  },
  mapImage: {
    width: "100%",
    height: 260,
    objectFit: "cover",
    borderRadius: 6,
    marginBottom: 20,
  },
  mapPlaceholder: {
    width: "100%",
    height: 260,
    backgroundColor: CREAM,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: LIGHT_BORDER,
  },
  mapPlaceholderText: {
    fontSize: 10,
    color: DARK_GRAY,
  },
  locationDetails: {
    flexDirection: "row",
    gap: 20,
    marginTop: 10,
  },
  locationLeft: {
    flex: 1.4,
  },
  locationRight: {
    flex: 1,
  },
  locationAddressLarge: {
    fontSize: 14,
    fontFamily: "Helvetica",
    fontWeight: "bold",
    color: MIDNIGHT,
    marginBottom: 4,
  },
  locationAddressSub: {
    fontSize: 10,
    color: DARK_GRAY,
    marginBottom: 14,
  },
  locationNeighborhood: {
    fontSize: 9.5,
    color: DARK_GRAY,
    lineHeight: 1.5,
    marginBottom: 14,
  },
  locationStatBox: {
    backgroundColor: CREAM,
    borderRadius: 4,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: LIGHT_BORDER,
  },
  locationStatLabel: {
    fontSize: 7.5,
    color: DARK_GRAY,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  locationStatValue: {
    fontSize: 12,
    fontFamily: "Helvetica",
    fontWeight: "bold",
    color: MIDNIGHT,
  },

  // ── Page 4: Agent ─────────────────────────────────────────────────────────
  agentPage: {
    padding: 40,
    paddingTop: 36,
    justifyContent: "space-between",
  },
  agentTop: {
    flexDirection: "row",
    gap: 24,
    marginTop: 8,
    marginBottom: 24,
  },
  agentPhoto: {
    width: 120,
    height: 140,
    objectFit: "cover",
    borderRadius: 6,
    borderWidth: 2,
    borderColor: GOLD,
  },
  agentPhotoPlaceholder: {
    width: 120,
    height: 140,
    backgroundColor: CREAM,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: GOLD,
    justifyContent: "center",
    alignItems: "center",
  },
  agentInfo: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 4,
  },
  agentName: {
    fontSize: 20,
    fontFamily: "Helvetica",
    fontWeight: "bold",
    color: MIDNIGHT,
    marginBottom: 3,
  },
  agentTitle: {
    fontSize: 10,
    color: GOLD,
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  agentBio: {
    fontSize: 8.5,
    color: DARK_GRAY,
    lineHeight: 1.55,
    marginBottom: 14,
  },
  agentContactRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 5,
  },
  agentContactLabel: {
    fontSize: 7.5,
    color: GOLD,
    fontWeight: "bold",
    letterSpacing: 0.5,
    width: 32,
  },
  agentContactValue: {
    fontSize: 8.5,
    color: MIDNIGHT,
  },
  agentBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: LIGHT_BORDER,
  },
  agentBottomLeft: {
    flex: 1,
  },
  agentLicense: {
    fontSize: 7.5,
    color: DARK_GRAY,
    marginBottom: 4,
  },
  fairHousing: {
    fontSize: 7,
    color: DARK_GRAY,
    lineHeight: 1.4,
    maxWidth: 280,
  },
  mlsNote: {
    fontSize: 6.5,
    color: "#999999",
    marginTop: 4,
    maxWidth: 280,
  },
  qrContainer: {
    alignItems: "center",
    gap: 6,
  },
  qrImage: {
    width: 80,
    height: 80,
  },
  qrLabel: {
    fontSize: 7,
    color: DARK_GRAY,
    textAlign: "center",
  },

  // ── Shared footer ─────────────────────────────────────────────────────────
  pageFooter: {
    position: "absolute",
    bottom: 24,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: LIGHT_BORDER,
    paddingTop: 8,
  },
  footerLogo: {
    fontSize: 9,
    fontFamily: "Helvetica",
    fontWeight: "bold",
    color: GOLD,
    letterSpacing: 1.5,
  },
  footerSite: {
    fontSize: 7.5,
    color: DARK_GRAY,
  },
});

// ── Helpers ────────────────────────────────────────────────────────────────

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

// ── Sub-components ─────────────────────────────────────────────────────────

function PageFooter({ address }: { address: string }) {
  return (
    <View style={styles.pageFooter}>
      <Text style={styles.footerLogo}>TAURO</Text>
      <Text style={styles.footerSite}>{address} | taurorealty.com</Text>
    </View>
  );
}

// ── PDF Component ──────────────────────────────────────────────────────────

export interface BrochureData {
  property: Property;
  qrCodeDataUrl: string;
  mapImageUrl: string | null;
}

export default function BrochurePDF({
  property,
  qrCodeDataUrl,
  mapImageUrl,
}: BrochureData) {
  const fullAddress = `${property.address}, ${property.city}, ${property.state} ${property.zip}`;
  const images = property.images.slice(0, 6);
  const thumbImages = images.slice(1, 5); // up to 4 thumbs after main

  return (
    <Document
      title={`${property.address} — Tauro Real Estate`}
      author="Tauro Real Estate"
      subject="Property Brochure"
      creator="taurorealty.com"
    >
      {/* ── Page 1: Hero ─────────────────────────────────────────────────── */}
      <Page size="LETTER" style={[styles.page, styles.heroPage]}>
        {images[0] && (
          <Image src={images[0]} style={styles.heroImage} />
        )}
        {/* Dark gradient overlay */}
        <View style={styles.heroOverlay} />

        <View style={styles.heroContent}>
          {/* Logo */}
          <View>
            <Text style={styles.heroLogo}>TAURO</Text>
            <Text style={styles.heroLogoSub}>REAL ESTATE</Text>
          </View>

          {/* Property info */}
          <View style={styles.heroBottom}>
            <Text style={styles.heroStatus}>{property.status} — {property.neighborhood}</Text>
            <Text style={styles.heroAddress}>{property.address}</Text>
            <Text style={styles.heroCity}>
              {property.city}, {property.state} {property.zip}
            </Text>
            <Text style={styles.heroPrice}>{formatPrice(property.price)}</Text>

            {/* Key metrics */}
            <View style={styles.heroStats}>
              <View style={styles.heroStat}>
                <Text style={styles.heroStatValue}>{property.beds}</Text>
                <Text style={styles.heroStatLabel}>BEDROOMS</Text>
              </View>
              <View style={styles.heroStat}>
                <Text style={styles.heroStatValue}>{property.baths}</Text>
                <Text style={styles.heroStatLabel}>BATHROOMS</Text>
              </View>
              <View style={styles.heroStat}>
                <Text style={styles.heroStatValue}>
                  {property.sqft.toLocaleString()}
                </Text>
                <Text style={styles.heroStatLabel}>SQ FT</Text>
              </View>
              <View style={styles.heroStat}>
                <Text style={styles.heroStatValue}>{property.propertyType}</Text>
                <Text style={styles.heroStatLabel}>PROPERTY TYPE</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Gold accent bar at top */}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            backgroundColor: GOLD,
          }}
        />
      </Page>

      {/* ── Page 2: Details ──────────────────────────────────────────────── */}
      <Page size="LETTER" style={[styles.page, styles.detailsPage]}>
        {/* Header */}
        <View style={styles.pageHeader}>
          <View>
            <Text style={styles.pageHeaderTitle}>Property Details</Text>
            <Text style={styles.pageHeaderAddress}>{fullAddress}</Text>
          </View>
          <Text style={styles.logoSmall}>TAURO</Text>
        </View>

        {/* Photo grid */}
        {images.length > 0 && (
          <View style={{ marginBottom: 16 }}>
            {/* Hero image */}
            <Image src={images[0]} style={styles.photoGridMain} />
            {/* Thumbnails row */}
            {thumbImages.length > 0 && (
              <View style={{ flexDirection: "row", gap: 6 }}>
                {thumbImages.map((img, i) => (
                  <Image key={i} src={img} style={styles.photoGridThumb} />
                ))}
              </View>
            )}
          </View>
        )}

        {/* Description */}
        <Text style={styles.sectionTitle}>About This Property</Text>
        <Text style={styles.descriptionText}>{property.description}</Text>

        {/* Key stats row */}
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            marginBottom: 16,
            backgroundColor: CREAM,
            borderRadius: 4,
            padding: 12,
          }}
        >
          {[
            { label: "Year Built", value: property.yearBuilt?.toString() ?? "N/A" },
            { label: "Lot Size", value: property.lotSqft > 0 ? `${property.lotSqft.toLocaleString()} SF` : "N/A" },
            { label: "Price / SF", value: `$${Math.round(property.price / property.sqft).toLocaleString()}` },
            { label: "Neighborhood", value: property.neighborhood },
          ].map(({ label, value }) => (
            <View key={label} style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontSize: 7.5, color: DARK_GRAY, marginBottom: 2 }}>{label}</Text>
              <Text style={{ fontSize: 10, fontWeight: "bold", color: MIDNIGHT }}>{value}</Text>
            </View>
          ))}
        </View>

        {/* Features */}
        <Text style={styles.sectionTitle}>Features &amp; Amenities</Text>
        <View style={styles.featuresGrid}>
          {(["interior", "exterior", "community"] as const).map((cat) => (
            <View key={cat} style={styles.featuresCol}>
              <Text style={styles.featureCatTitle}>{cat}</Text>
              {property.features[cat].map((f) => (
                <View key={f} style={styles.featureItem}>
                  <Text style={styles.featureBullet}>•</Text>
                  <Text style={styles.featureText}>{f}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        <PageFooter address={property.address} />
      </Page>

      {/* ── Page 3: Location ─────────────────────────────────────────────── */}
      <Page size="LETTER" style={[styles.page, styles.locationPage]}>
        {/* Header */}
        <View style={styles.pageHeader}>
          <View>
            <Text style={styles.pageHeaderTitle}>Location & Neighborhood</Text>
            <Text style={styles.pageHeaderAddress}>{fullAddress}</Text>
          </View>
          <Text style={styles.logoSmall}>TAURO</Text>
        </View>

        {/* Map */}
        {mapImageUrl ? (
          <Image src={mapImageUrl} style={styles.mapImage} />
        ) : (
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapPlaceholderText}>
              {property.address} · {property.city}, {property.state}
            </Text>
          </View>
        )}

        {/* Location details */}
        <View style={styles.locationDetails}>
          <View style={styles.locationLeft}>
            <Text style={styles.locationAddressLarge}>{property.neighborhood}</Text>
            <Text style={styles.locationAddressSub}>{property.city}, {property.state}</Text>
            <Text style={styles.locationNeighborhood}>
              {property.address} is located in {property.neighborhood}, one of {property.city}&apos;s most sought-after neighborhoods. The area offers a perfect blend of culture, dining, and convenience — ideal for discerning buyers seeking both lifestyle and investment value.
            </Text>

            {/* Community features */}
            {property.features.community.length > 0 && (
              <View>
                <Text style={styles.featureCatTitle}>Community Highlights</Text>
                {property.features.community.slice(0, 5).map((f) => (
                  <View key={f} style={styles.featureItem}>
                    <Text style={styles.featureBullet}>•</Text>
                    <Text style={styles.featureText}>{f}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={styles.locationRight}>
            <View style={styles.locationStatBox}>
              <Text style={styles.locationStatLabel}>FULL ADDRESS</Text>
              <Text style={[styles.locationStatValue, { fontSize: 9 }]}>{fullAddress}</Text>
            </View>
            <View style={styles.locationStatBox}>
              <Text style={styles.locationStatLabel}>NEIGHBORHOOD</Text>
              <Text style={styles.locationStatValue}>{property.neighborhood}</Text>
            </View>
            <View style={styles.locationStatBox}>
              <Text style={styles.locationStatLabel}>PROPERTY STATUS</Text>
              <Text style={[styles.locationStatValue, { color: GOLD }]}>{property.status}</Text>
            </View>
            {property.openHouse && (
              <View style={styles.locationStatBox}>
                <Text style={styles.locationStatLabel}>OPEN HOUSE</Text>
                <Text style={[styles.locationStatValue, { fontSize: 9 }]}>{property.openHouse}</Text>
              </View>
            )}
          </View>
        </View>

        <PageFooter address={property.address} />
      </Page>

      {/* ── Page 4: Agent ────────────────────────────────────────────────── */}
      <Page size="LETTER" style={[styles.page, styles.agentPage]}>
        {/* Header */}
        <View style={styles.pageHeader}>
          <View>
            <Text style={styles.pageHeaderTitle}>Your Agent</Text>
            <Text style={styles.pageHeaderAddress}>{fullAddress}</Text>
          </View>
          <Text style={styles.logoSmall}>TAURO</Text>
        </View>

        {/* Agent card */}
        <View style={styles.agentTop}>
          {property.agent.photo ? (
            <Image src={property.agent.photo} style={styles.agentPhoto} />
          ) : (
            <View style={styles.agentPhotoPlaceholder}>
              <Text style={{ fontSize: 8, color: DARK_GRAY }}>Photo</Text>
            </View>
          )}

          <View style={styles.agentInfo}>
            <Text style={styles.agentName}>{property.agent.name}</Text>
            <Text style={styles.agentTitle}>Listing Agent — Tauro Real Estate</Text>

            <View style={styles.agentContactRow}>
              <Text style={styles.agentContactLabel}>PHONE</Text>
              <Text style={styles.agentContactValue}>{property.agent.phone}</Text>
            </View>
            <View style={styles.agentContactRow}>
              <Text style={styles.agentContactLabel}>EMAIL</Text>
              <Text style={styles.agentContactValue}>{property.agent.email}</Text>
            </View>
            <View style={[styles.agentContactRow, { marginBottom: 12 }]}>
              <Text style={styles.agentContactLabel}>WEB</Text>
              <Text style={styles.agentContactValue}>taurorealty.com</Text>
            </View>
          </View>
        </View>

        {/* Property summary */}
        <View
          style={{
            backgroundColor: CREAM,
            borderRadius: 6,
            padding: 16,
            marginBottom: 20,
            borderLeftWidth: 3,
            borderLeftColor: GOLD,
          }}
        >
          <Text style={[styles.sectionTitle, { marginBottom: 8 }]}>
            {property.address}
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: GOLD, marginBottom: 6 }}>
            {formatPrice(property.price)}
          </Text>
          <View style={{ flexDirection: "row", gap: 24 }}>
            <Text style={{ fontSize: 9, color: DARK_GRAY }}>{property.beds} Bedrooms</Text>
            <Text style={{ fontSize: 9, color: DARK_GRAY }}>{property.baths} Bathrooms</Text>
            <Text style={{ fontSize: 9, color: DARK_GRAY }}>{property.sqft.toLocaleString()} Sq Ft</Text>
            <Text style={{ fontSize: 9, color: DARK_GRAY }}>{property.propertyType}</Text>
          </View>
        </View>

        {/* Bottom: legal + QR */}
        <View style={styles.agentBottom}>
          <View style={styles.agentBottomLeft}>
            <Text style={styles.fairHousing}>
              🏠 Equal Housing Opportunity — We are committed to the letter and spirit of U.S. policy for the achievement of equal housing opportunity throughout the Nation.
            </Text>
            <Text style={styles.mlsNote}>
              This brochure is for informational purposes only. All information deemed reliable but not guaranteed. Prices subject to change without notice. © {new Date().getFullYear()} Tauro Real Estate. All rights reserved.
            </Text>
          </View>

          {/* QR code */}
          <View style={styles.qrContainer}>
            {qrCodeDataUrl && (
              <Image src={qrCodeDataUrl} style={styles.qrImage} />
            )}
            <Text style={styles.qrLabel}>Scan to view{"\n"}online listing</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
